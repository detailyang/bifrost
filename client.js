/*
* @Author: detailyang
* @Date:   2015-12-05 18:00:28
* @Last Modified by:   detailyang
* @Last Modified time: 2015-12-18 12:02:31
*/

'use strict';
var koa = require('koa');
var app = koa();
var config = require('./config');
var koajade = require('koa-jade')
var json = require('koa-json');
var rawbody = require('raw-body');
var bodyParser = require('koa-bodyparser');
var request = require('./utils/request');
var colors = require('colors');
var argv = require('minimist')(process.argv.slice(2));
var util = require("util");
var customheaders ={}

//get header
if (argv.header) {
    if (Array.isArray(argv.header)) {
        for (var i = argv.header.length - 1; i >= 0; i--) {
            var h = argv.header[i].split(':');
            if (h.length != 2) {
                console.log(colors.red("header only support like --header \"host: example.com\""));
                process.exit(1);
            }
            customheaders[h[0]] = h[1];
        };
    } else {
        var h = argv.header.split(':');
        if (h.length != 2) {
            console.log(colors.red("header only support like --header \"host: example.com\""));
            process.exit(1);
        }
        customheaders[h[0]] = h[1];
    }
}
body: var postBody =  JSON.stringify({
    type: argv.type,
    port: argv.listen,
    token: argv.token,
    hostname: argv.hostname,
    user: argv.user
});

//add headers
request['POST']('http', {
    hostname: argv.domain,
    path: '/client',
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'content-length': postBody.length
    },
    body: postBody
}).then(function(res){
    if (res.statusCode < 500 && res.statusCode >= 400) {
        console.log(colors.red(res.body.toString()));
        return;
    }
    app.use(function *(next) {
        if (!request[this.method]) {
            this.status = 405;
            return;
        }

        var headers = JSON.parse(JSON.stringify(this.request.headers));
        delete headers.host;

        if (this.method == "GET") {
            var body = undefined;
        } else {
            var body = yield rawbody(this.req, {});
        }

        console.log(colors.red("request:"));
        console.log(colors.green(`${this.method} ${this.request.url} HTTP/${this.req.httpVersion}`));
        for (var key in this.request.headers) {
            console.log(colors.green(`${key}: `), colors.green(this.request.headers[key]));
        }
        console.log(colors.red("request body:"));
        console.log(colors.green(body?body:""));

        try {
            var headers = JSON.parse(JSON.stringify(this.request.headers));
            delete headers.host;
            for (var key in customheaders) {
                headers[key] = customheaders[key];
            }
            var response = yield request[this.method](
                argv.type, {
                hostname: argv.local,
                port: argv.port,
                path: this.request.url,
                method: this.method,
                headers: headers,
                body: body
            });
        } catch (e) {
            console.log(e);
            this.body = {
                code: 9999,
                msg: e,
                value: e
            };
            this.status = 500;
            return;
        }

        this.body = response.body;
        //remove default field
        for (var key in this.response.header) {
            this.response.remove(key);
        }
        for (var key in response.headers) {
            this.response.set(key, response.headers[key]);
        }
        this.status = response.statusCode;

        console.log(colors.red("response:"));
        console.log(colors.green(`HTTP/${response.httpVersion} ${response.statusCode} ${response.statusMessage}`));
        for (var key in response.headers) {
            console.log(colors.green(`${key}: `), colors.green(response.headers[key]));
        }
        console.log(colors.red("response body:"));
        console.log(colors.green(response.body?response.body:""));
    });

    app.listen(argv.listen, () => {
        console.log("listen " + argv.listen);
    });
}).catch(function(error) {
    console.log("get error:", error);
})

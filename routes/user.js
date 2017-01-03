/*
* @Author: detailyang
* @Date:   2015-12-05 22:55:00
* @Last Modified by:   detailyang
* @Last Modified time: 2015-12-10 21:17:08
*/

'use strict';
var router = require('koa-router')();
var request = require('../utils/request');
var body   = require('koa-body');
var rawbody = require('raw-body');
var models = require('../models');
var url = require('url');
var config = require('../config');

module.exports = router;

function *method(ctx, next) {
    if (!request[ctx.method]) {
        ctx.status = 405;
        return;
    }

    var user = ctx.hostname.substr(0, ctx.hostname.indexOf('.'));
    var tmp = yield models.hget(user, "upstream");
    if (tmp == null) {
        ctx.status = 403;
        return;
    }
    var upstream = url.parse(tmp);
    if (upstream.protocol != "http:" && upstream.protocol != "https:") {
        ctx.status = 406;
        return;
    }

    if (ctx.method == "GET") {
        var body = undefined;
    } else {
        var body = yield rawbody(ctx.req, {});
    }

    var hostname = yield models.hget(user, "hostname");

    var headers = JSON.parse(JSON.stringify(ctx.request.headers));
    delete headers.host;
    headers['host'] = hostname ? hostname : upstream.hostname;

    try {
        var response = yield request[ctx.method](upstream.protocol.substr(0, upstream.protocol.length - 1), {
            hostname: upstream.hostname,
            port: upstream.port,
            path: ctx.request.url,
            method: ctx.method,
            headers: headers,
            body: body
        });
    } catch (e) {
        ctx.body = {
            code: 9999,
            msg: e.errno,
            value: e
        };
        return;
    }

    //record request and response
    var r = yield {
        'request': models.hset(user, "request", JSON.stringify(ctx.request)),
        'request-body': models.hset(user, "request-body", body),
        'response': models.hset(user, "response", JSON.stringify({
            status: response.statusCode,
            message: response.statusMessage,
            version: response.httpVersion,
            header: response.headers
        })),
        'response-body': models.hset(user, "response-body", response.body)
    }

    ctx.body = response.body;
    //remove default field
    for (var key in ctx.response.header) {
        ctx.response.remove(key);
    }
    for (var key in response.headers) {
        ctx.response.set(key, response.headers[key]);
    }
    ctx.status = response.statusCode;
    yield next;
}

router.get('/(.*)', function *(next) {
    yield method(this, next);
});

router.post('/(.*)', function *(next) {
    yield method(this, next);
});

router.delete('/(.*)', function *(next) {
    yield method(this, next);
});

router.put('/(.*)', function *(next) {
    yield method(this, next);
});

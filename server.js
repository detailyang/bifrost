/*
* @Author: detailyang
* @Date:   2015-12-05 18:00:28
* @Last Modified by:   detailyang
* @Last Modified time: 2015-12-08 15:52:41
*/

'use strict';
var koa = require('koa');
var app = koa();
var config = require('./config');
var koajade = require('koa-jade')
var json = require('koa-json');
var bodyParser = require('koa-bodyparser');
var serve = require('koa-static');

//body parse
app.use(bodyParser({
  extendTypes: {
    json: ['application/x-javascript', 'application/json'] // will parse application/x-javascript type body as a JSON string
  }
}));

//json
app.use(json());

app.use(serve(__dirname + '/static'));

//jade
var jade = new koajade({
    viewPath: './views/'
});
app.use(jade.middleware);

//logger
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s %sms', this.method, this.url, ms);
});

var user = require('./routes/user');
var index = require('./routes/index');
var client = require('./routes/client');
var sevenlayer = require('./routes/7layer');
var token = require('./routes/token');

//regsiter route
app.use(index.routes());
app.use(client.routes());
app.use(sevenlayer.routes());
app.use(token.routes());
//only subdomain can pass
app.use(function *(next) {
    var pos = this.hostname.indexOf(config.web.hostname);
    if (pos == -1) {
        this.status = 401;
        return;
    } else if (pos == 0) {
        this.redirect(`http://${config.web.hostname}`);
        this.status = 301;
        return;
    }
    yield next;
});
app.use(user.routes());

app.listen(config['web'].port, () => {
    console.log("listen " + config['web'].port);
});

/*
* @Author: detailyang
* @Date:   2015-12-05 22:55:00
* @Last Modified by:   detailyang
* @Last Modified time: 2015-12-11 15:26:17
*/

'use strict';
var router = require('koa-router')();
var models = require('../models');
var config = require('../config');

module.exports = router;

router.get('/7layer', function *(next) {
    if (this.request.hostname != config.web.hostname) {
        yield next;
        return ;
    }
    var users = yield models.keys('*');

    var x = [];
    for (var i = users.length - 1; i >= 0; i--) {
        x.push(users[i].replace(config.redis.prefix, ""));
    };
    this.body = x;
});

router.get('/7layer/:user/request', function *(next) {
    if (this.request.hostname != config.web.hostname) {
        yield next;
        return ;
    }
    this.body = JSON.parse(yield models.hget(this.params.user, "request"));
});

router.get('/7layer/:user/request-body', function *(next) {
    if (this.request.hostname != config.web.hostname) {
        yield next;
        return ;
    }
    var requestBody = yield models.hget(this.params.user, "request-body");
    this.body =  {
        'body': requestBody
    };
});

router.get('/7layer/:user/response', function *(next) {
    if (this.request.hostname != config.web.hostname) {
        yield next;
        return ;
    }
    this.body = JSON.parse(yield models.hget(this.params.user, "response"));
});

router.get('/7layer/:user/response-body', function *(next) {
    if (this.request.hostname != config.web.hostname) {
        yield next;
        return ;
    }
    var responseBody = yield models.hget(this.params.user, "response-body");
    this.body =  {
        'body': responseBody
    };
});

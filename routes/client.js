/*
* @Author: detailyang
* @Date:   2015-12-05 22:55:00
* @Last Modified by:   detailyang
* @Last Modified time: 2015-12-11 15:37:18
*/

'use strict';
var router = require('koa-router')();
var models = require('../models');
var config = require('../config');

module.exports = router;

router.post('/client', function *(next) {
    if (this.request.hostname != config.web.hostname) {
        yield next;
        return ;
    }
    var user = this.request.body.user
    if (!user) {
        this.status = 400;
        this.body = {
            code: 1002,
            msg: 'user canont be empty',
            value: null
        }
        return
    }
    var token = this.request.body.token;
    var truetoken= yield models.hget(user, 'token');
    if (token != truetoken) {
        this.status = 401;
        return;
    }
    var type = this.request.body.type;
    if (!type || ! type in ['https', 'http', 'tcp']) {
        this.status = 400;
        this.body = {
            code: 1002,
            msg: 'type dont support',
            value: null
        }
        return
    }
    var port = this.request.body.port;
    if (!port) {
        this.status = 400;
        this.body = {
            code: 1003,
            msg: 'port cannot be empty',
            value: null
        }
        return
    }

    var ip = this.ip.split(':')[3];
    var hostname = this.request.body.hostname;

    yield [
        models.hset(user, 'upstream', `${type}://${ip}:${port}`),
        models.hset(user, 'hostname', hostname)
    ];
    this.body = {
        code: 1000,
        msg: 'ok',
        value: null
    };
});

router.get('/client', function *(next) {
    if (this.request.hostname != config.web.hostname) {
        yield next;
        return ;
    }
    var upstream = yield models.hget(user, 'upstream')
    this.body = {
        code: 1000,
        msg: 'ok',
        value: upstream
    };
});

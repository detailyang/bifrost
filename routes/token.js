/*
* @Author: detailyang
* @Date:   2015-12-08 15:37:26
* @Last Modified by:   detailyang
* @Last Modified time: 2015-12-11 15:25:16
*/

'use strict';
var router = require('koa-router')();
var models = require('../models');
var config = require("../config");
var uuid = require('node-uuid');

module.exports = router;

router.post('/token', function *(next) {
    if (this.request.hostname != config.web.hostname) {
        yield next;
        return ;
    }
    var user = this.request.body.user;
    var ttl = this.request.body.ttl;

    if (!user || !ttl) {
        this.body = {
            code: 1001,
            msg: 'user or ttl cannot be null',
            value: null
        };
        return;
    }

    //only support max one month
    if (ttl > 60 * 60 * 24 * 30) {
        this.body = {
            code: 1001,
            msg: 'only support max one month',
            value: null
        };
        return;
    }
    var token = uuid.v4().slice(0, 8);
    yield models.hset(user, 'token', token);
    yield models.expire(user, ttl);
    this.body = {
        code: 1000,
        msg: 'okay',
        value: token
    };
});

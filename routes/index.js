/*
* @Author: detailyang
* @Date:   2015-12-05 22:55:00
* @Last Modified by:   detailyang
* @Last Modified time: 2015-12-08 14:44:10
*/

'use strict';
var router = require('koa-router')();
var models = require('../models');
var config = require("../config");

module.exports = router;

router.get('/', function *(next) {
    if (this.request.hostname != config.web.hostname) {
        yield next;
        return ;
    }
    this.render('index');
});

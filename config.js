/*
* @Author: detailyang
* @Date:   2015-12-06 00:23:50
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-20 15:52:42
*/

'use strict';

var config = module.exports;

if (process.env.NODE_ENV === 'dev') {
    config['redis'] = {
        prefix: "bifrost.",
        host: "127.0.0.1",
        port: "6379"
    };
    config['web'] = {
        port: 80,
        hostname: 'bifrost.example.com'
    };
} else {
    config['redis'] = {
        prefix: "bifrost.",
        host: "127.0.0.1",
        port: "6379"
    };
    config['web'] = {
        port: 80,
        hostname: 'bifrost.example.com'
    };
}
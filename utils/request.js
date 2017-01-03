/*
* @Author: detailyang
* @Date:   2015-12-05 22:26:01
* @Last Modified by:   detailyang
* @Last Modified time: 2015-12-06 13:37:43
*/

'use strict';
var http = require('http');
var https = require('https');

module.exports = {
    GET: function(protocol, options) {
        return new Promise(function(resolve, reject) {
            if (protocol == "https") {
                var _ = https;
            } else {
                var _ = http;
            }
            _.get(options, function(res) {
                var buffers = [];
                res.on('data', function(chunk) {
                    buffers.push(chunk);
                });
                res.on('end', function() {
                    res.body = Buffer.concat(buffers);
                    resolve(res);
                });
            }).
            on('error', function(error) {
                reject(error);
            });
        });
    },
    POST: function(protocol, options) {
        return new Promise(function(resolve, reject) {
            if (protocol == "https") {
                var _ = https;
            } else {
                var _ = http;
            }
            var req = http.request(options, function(res) {
                var buffers = []
                res.on('data', function(chunk) {
                    buffers.push(chunk);
                });
                res.on('end', function() {
                    res.body = Buffer.concat(buffers);
                    resolve(res);
                });
            });

            req.on('error', function(error){
                reject(error);
            })
            if (options.body instanceof Object) {
                req.write(JSON.stringify(options.body));
            } else {
                req.write(options.body);
            }
            req.end();
        });
    },
    DELETE: function(protocol, options) {
        return this.POST(protocol, options);
    },
    PUT: function(protocol, options) {
        return this.POST(protocol, options);
    }
}

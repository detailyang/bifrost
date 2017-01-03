/*
* @Author: detailyang
* @Date:   2015-12-06 00:28:46
* @Last Modified by:   detailyang
* @Last Modified time: 2015-12-11 15:28:41
*/

'use strict';

var redis = require('redis');
var config = require('../config');
var client = redis.createClient(config['redis'].port, config['redis'].host, {
    prefix: config.redis.prefix
});

module.exports = {
    set: function(k, v) {
        return new Promise(function(resolve, reject) {
            client.set(k, v, function(err, replies) {
                if (err) {
                    reject(err);
                } else {
                    resolve(replies);
                }
            });
        });
    },
    setex: function(k, v, s) {
        return new Promise(function(resolve, reject) {
            client.setex([k, s, v], function(err, replies) {
                if (err) {
                    reject(err);
                } else {
                    resolve(replies);
                }
            });
        });
    },
    get: function(k) {
        return new Promise(function(resolve, reject) {
            client.get(k, function(err, reply) {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    },
    hset: function(k, f, v) {
        return new Promise(function(resolve, reject) {
            client.hset(k, f, v, function(err, replies) {
                if (err) {
                    reject(err);
                } else {
                    resolve(replies);
                }
            });
        });
    },
    hget: function(k, f) {
        return new Promise(function(resolve, reject) {
            client.hget(k, f, function(err, replies) {
                if (err) {
                    reject(err);
                } else {
                    resolve(replies);
                }
            });
        });
    },
    keys: function(p) {
        return new Promise(function(resolve, reject) {
            client.keys(p, function(err, replies) {
                if (err) {
                    reject(err);
                } else {
                    resolve(replies);
                }
            });
        });
    },
    expire: function(k, ttl) {
        return new Promise(function(resolve, reject) {
            client.expire([k, ttl], function(err, replies) {
                if (err) {
                    reject(err);
                } else {
                    resolve(replies);
                }
            });
        });
    }
}


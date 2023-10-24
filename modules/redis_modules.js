/**
 * Functions for interacting with Redis Modules
 */

/*
    * Module dependencies
    * Set values using redis hash
 */
exports.setValuesWithHash = function (hash, key, value) {
    hash.set(key, value, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
    });
}

//redis client
exports.setupRedisClient = function()  {
    const redis = require('redis');
    const password = process.env.REDIS_PASSWORD;
    const client = redis.createClient({
        password: password,
        socket: {
            host: 'redis-11503.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
            port: 11503
            }
       });
    return client;
}
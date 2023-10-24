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
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            }
       });
    return client;
}
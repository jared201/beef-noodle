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
function setupRedisClient() {
    const redis = require('redis');
    const client = redis.createClient({
        host: 'redis-17269.c1.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 6379,
        database: "beef-noodle",
    });
    return client;
}
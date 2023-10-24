/**
 * Module for handling subscription events
 */

// Activation paypal webhook
exports.activateSubscription = function(body, callback) {
    let payer_email = body.payer_email;
    let item_name = body.item_name;
    //check txn_type
    if (body.txn_type === 'subscr_signup') {
        //insert payer_email in redis cache
    }
}

// Save subscription details
exports.saveSubscription = function(body, callback) {
    // save subscription details in redis cache with the following keys in hash:
    // payer_email, item_name, api_key
    // use the following keys in redis cache:
    // payer_email, item_name, api_key
    const rm = require('./redis_modules');
    const keygenerator = require('./keygenerator');
    const client = rm.setupRedisClient();
    let payer_email = body.payer_email;
    let item_name = body.item_name;
    let api_key = keygenerator.generateKey();
    // create json object and save it using redis json
    let json = {
        "payer_email": payer_email,
        "item_name": item_name,
        "api_key": api_key
    }
    //save subscription details in redis cache with hash
    client.connect({
        host: 'redis-11503.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 11503,
        password: process.env.REDIS_PASSWORD
    })
    .then(function() {
        // save subscription details in redis cache with hash
        client.hSet('subs-' + payer_email, 'payer_email', payer_email, function(err, result) {
        if (err) {
                console.log(err);
            }
            console.log(result);
        })
        client.hSet('subs-' + payer_email, 'item_name', item_name, function(err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
        })
        client.hSet('subs-' + payer_email, 'api-key', api_key, function(err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
        })
    })
    callback(api_key);
}
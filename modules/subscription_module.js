/**
 * Module for handling subscription events
 */

// Activation paypal webhook
exports.handleSubscription = function(body, callback) {
    let payer_email = body.payer_email;
    let item_name = body.item_name;
    //callback immediately with 200 status
    callback('');
    //check txn_type
    if (body.txn_type === 'subscr_signup') {
        console.log('subscr_signup');
    }
    //handle subscr_payment
    if (body.txn_type === 'subscr_payment') {
        const subscription = require('./subscription_module');
        subscription.saveSubscription(body, function(api_key) {
            callback(api_key);
        });
    }
    if (body.txn_type === 'subscr_cancel') {
        const subscription = require('./subscription_module');
        cancelSubscription(body, function(api_key) {
            callback(api_key);
        });
    }
}

// cancel subscription
function cancelSubscription(body, callback) {
    // cancel subscription
    // set status to inactive
    // remove api key
    const rm = require('./redis_modules');
    const keygenerator = require('./keygenerator');
    const client = rm.setupRedisClient();
    let payer_email = body.payer_email;
    let item_name = body.item_name;
    let api_key = keygenerator.generateKey();
    //add expiration date for api key one year from now
    let date = new Date();
    date = date.setFullYear(date.getFullYear() + 1);
    date = new Date (date);
    let TTL = date.getTime();
    let strDate = date.toDateString();

    // create json object and save it using redis json
    let json = {
        "payer_email": payer_email,
        "item_name": item_name,
        "api_key": api_key,
        "expiration_date": TTL,
        "status": "inactive"
    }
    //save subscription details in redis cache with hash
    client.connect()
    .then(function() {
        // update subscription details in redis cache with hash
        client.json.set('subs-'+ payer_email, '.', JSON.stringify(json), function(err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });

    }).then(
        function() {
            try
            {

                client.quit();
                callback(api_key);
            } catch (err) {
                console.log(err);
            };
        }
    )
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
    //add expiration date for api key one year from now
    let date = new Date();
    date = date.setFullYear(date.getFullYear() + 1);
    date = new Date (date);
    let TTL = date.getTime();
    let strDate = date.toDateString();

    // create json object and save it using redis json
    let json = {
        "payer_email": payer_email,
        "item_name": item_name,
        "api_key": api_key,
        "expiration_date": TTL,
        "status": "active"
    }
    //save subscription details in redis cache with hash
    client.connect()
    .then(function() {
        // save subscription details in redis cache with hash
        client.json.set('subs-'+ payer_email, '.', JSON.stringify(json), function(err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });
        client.ttl('subs-' + payer_email, TTL, function(err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });
        client.lPush('subscriptions', 'subs-' + payer_email, function(err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });
    }).then(
        function() {
            try
            {

                client.quit();
                callback(api_key);
            } catch (err) {
                console.log(err);
            };
        }
    )

}
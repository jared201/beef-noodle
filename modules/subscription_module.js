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
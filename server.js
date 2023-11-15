/*
The main javascript file for the server.
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3001;
const path = require('path');
const querystring = require("querystring");
const {query} = require("express");
// initialize express
app.use(express.static('public'));
// initialize path
app.use(express.static(path.join(__dirname, 'build')));
// initialize cors
app.use(cors());
// initialize body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// add your endpoints here
app.get('/hello', function (req, res) {
    res.status(200).send('Hello World!');
})
    .get('/get-key', function (req, res) {
        const keygenerator = require('./modules/keygenerator');
        const key = keygenerator.generateKey();
        res.status(200).send(key);
    })
    .get('/test-subscription', function (req, res) {
        const subscription = require('./modules/subscription_module');
        const body = {
            payer_email: 'jared.odulio@gmail.com',
            item_name: 'test',
            txn_type: 'subscr_signup',
        }
        subscription.saveSubscription(body, function (api_key) {
                res.status(200).send(api_key);
        });
    }).post('/paypal-webhook', function (req, res) {
        const subscription = require('./modules/subscription_module');
        let transmissionId = req.query.transmissionId;
        let timestamp = req.query.timestamp;
        let webhookId = req.query.webhookId;
        let crc32 = req.query.crc32;
        console.log(transmissionId);
        console.log(timestamp);
        console.log(webhookId);
        console.log(crc32);
        let body = req.body;
        if (typeof body === 'string') {
            body = JSON.parse(body);
        } // else convert object to string
         if (typeof body === 'object') {
            body = querystring.stringify(body);

        }
        console.table(body);
        subscription.handleSubscription(body, function (result) {
            res.status(200).send('');
        });
    });
//listen to port

app.listen(port, () => console.log(`Server listening on port ${port}!`));
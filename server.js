/*
The main javascript file for the server.
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001 || process.env.PORT;
const path = require('path');
// initialize express
app.use(express.static('public'));
// initialize path
app.use(express.static(path.join(__dirname, 'build')));
// initialize cors
app.use(cors());
// initialize body-parser
app.use(bodyParser.json());
// add your endpoints here
app.get('/hello', function (req, res) {
    res.status(200).send('Hello World!');
})
    .get('/get-key', function (req, res) {
        const keygenerator = require('./modules/keygenerator');
        const key = keygenerator.generateKey();
        res.status(200).send(key);
    })
//listen to port

app.listen(port, () => console.log(`Server listening on port ${port}!`));
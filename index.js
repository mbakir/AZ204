const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const { json } = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.get('/api/hello', (req, res) => {

    res.send('Hello World')
})

app.get('/api/merhaba', (req, res) => {

    res.send('Merhaba Dünya')
})

app.get('/api/sa', (req, res) => {

    res.send('as')
})

app.get('/api/iftar', (request, response) => {
    var http = require("https");

    var options = {
        "method": "GET",
        "hostname": "api.collectapi.com",
        "port": null,
        "path": "/pray/single?ezan=Yats%C4%B1&data.city=istanbul",
        "headers": {
            "content-type": "application/json",
            "authorization": "apikey 2EoWEVJcaRPSWQrT9Wmt3C:1pbimj62bZ274ylra46CAl"
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            var obj = JSON.parse(body);
            console.log(obj.result);
            response.send("İftara " + obj.result[0].hour + " " + obj.result[0].min.replace(".","") + " kaldı")
        });
    });

    req.end();

})

app.post('/api/name', (req, res) => {

    const body = _.pick(req.body, ['firstName', 'lastName'])
    console.log(body)
    res.send('Hello ' + body.firstName + ' ' + body.lastName)
})

app.listen(8080, () => {
    console.log('app server is running')
})
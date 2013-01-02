#!/usr/bin/env nodejs
var express = require('express');
var app = express();
var bakery = {
    1: {pieId: 1, type:'pecan pie', slices: 4},
    2: {pieId: 2, type:'apple pie', slices: 3},
    3: {pieId: 3, type:'cheasecake', slices: 5}
}, lastId = 3;
app.use(express.bodyParser());
// app.use('/apps', express.static('.'));
app.get('/', function (req, res) {
    console.log('seding index.html');
    res.sendfile('TestModelSyncZope.html');
});

app.get('/ModelRoot', function (req, res) {
    console.log('received GET for Model', req.query);
    switch (req.query.zopeaction) {
        case 'read':
            res.send({patientId: res.query.patientId, fname: 'Pepe ' + res.query.patientId, lname: 'Pérez ' + res.query.patientId})
            break;
        case 'delete':
            res.send(200);
            break;
        default:
            res.send(404);
    }


});
var count = 10;
app.post('/ModelRoot', function (req, res) {
    console.log('received POST for Model', req.query);
    console.log('   Body for request', req.body);
    switch (req.query.zopeaction) {
        case 'create':
            res.send({patientId: count++})
            break;
        case 'update':
            res.send({});
            break;
        default:
            res.send(404);
    }


});
app.get('/ModelListRoot', function (req, res) {
    console.log('received for ModelList', req.query);
    switch (req.query.zopeaction) {
        case 'read':
            res.send([
                {patientId:1, fname: 'Daniel', lname: 'Barreiro'},
                {patientId:2, fname: 'José', lname: 'Núñez'},
                {patientId:3, fname: 'Martín', lname: 'Güemes'}
            ]);
            break;
        default:
            res.status(404);
    }


});

app.get('*', function (req, res) {
    console.log('*', req.path);
    res.sendfile('.' + req.path);
});


app.listen(3000);
console.log('Listening on port 3000');
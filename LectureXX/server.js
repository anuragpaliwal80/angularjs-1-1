var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});

var express = require('express');
var http = require("http");
var app = express();
var mqtt = require('./mqtt-client');

app.get('/', function (req, res) {
  if (datatemp.length == 0 || datahum.length == 0 || datapress.length == 0 ||
    dataalt.length == 0) {
    res.send('Oops, something goes wrong)');
    return;
  }

  res.send(mess);
});

//wakeup server every 20 min
setInterval(function () {
  http.get("https://mysoft.herokuapp.com/");
}, 1200000); // every 20 minutes

app.listen(process.env.PORT || 3000, function () {
  console.log('Adress:localhost:3000');
});
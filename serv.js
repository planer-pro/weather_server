var express = require('express');
var http = require("http");
var app = express();
var mqtt = require('./mqtt-client');

//webpack live reload
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));
//------------

app.use(express.static('public'));

var history = {
  temperature: [],
  humidity: []
};

app.get('/api/history', function (req, res) {

  history.temperature.push({
    x: new Date(),
    y: mqtt.data.temp
  });

  history.humidity.push({
    x: new Date(),
    y: mqtt.data.hum
  });

  res.json(history);
});

app.get('/api/meteo', function (req, res) {

  var meteo = {
    time: new Date(),
    temperature: mqtt.data.temp,
    humidity: mqtt.data.hum,
    pressure: mqtt.data.press,
    altitude: mqtt.data.alt
  }

  res.json(meteo);
});

//wakeup server every 20 min
setInterval(function () {
  http.get("https://mysoft.herokuapp.com/");
}, 1200000); // every 20 minutes

app.listen(process.env.PORT || 3000, function () {
  console.log('Adress:localhost:3000');
});
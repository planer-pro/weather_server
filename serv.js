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
  temp: [],
  hum: [],
  press: [],
  alt: []
};

app.get('/api/history', function (req, res) {

  history.temp = mqtt.data.temp;
  history.hum = mqtt.data.hum;
  history.press = mqtt.data.press;
  history.alt = mqtt.data.alt;

  res.json(history);
});

app.get('/api/meteo', function (req, res) {

  var meteo = {
    time: new Date().toTimeString(),
    temperature: mqtt.curData.temp,
    humidity: mqtt.curData.hum,
    pressure: mqtt.curData.press,
    altitude: mqtt.curData.alt
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
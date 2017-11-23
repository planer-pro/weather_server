var mqtt = require('mqtt'),
  url = require('url');
var express = require('express');
var http = require("http");
var app = express();
// Parse 
var mqtt_url = url.parse('mqtt://m14.cloudmqtt.com:13682');
var auth = ['oixflctz', '-AgegtRMpwhG'];
var url = "mqtt://" + mqtt_url.host;
var datatemp = [];
var datahum = [];
var datapress = [];
var dataalt = [];

var options = {
  port: mqtt_url.port,
  clientId: 'my cool client',
  username: auth[0],
  password: auth[1],
};

var client = mqtt.connect(url, options);

client.on('connect', () => {
  client.subscribe('#')
  client.publish('outdoor/sensors/bme280_getState', '1')
});

client.on('message', (topic, message) => {
  switch (topic) {
    case 'outdoor/sensors/bme280_temp':
      datatemp.push({
        message: message,
        time: new Date()
      })
      if (datatemp.length > 43200) {
        datatemp.shift()
      }
      break;

    case 'outdoor/sensors/bme280_hum':
      datahum.push({
        message: message,
        time: new Date()
      })
      if (datahum.length > 43200)
        datahum.shift()
      break;

    case 'outdoor/sensors/bme280_press':
      datapress.push({
        message: message,
        time: new Date()
      })
      if (datapress.length > 43200)
        datapress.shift()
      break;

    case 'outdoor/sensors/bme280_alt':
      dataalt.push({
        message: message,
        time: new Date()
      })
      if (dataalt.length > 43200)
        dataalt.shift()
      break;
  }
})

app.get('/', function (req, res) {
  if (datatemp.length == 0 || datahum.length == 0 || datapress.length == 0 ||
    dataalt.length == 0) {
    res.send('Oops, something goes wrong)');
    return;
  }

  var mess = `
        <!DOCTYPE html>
        <html>
         <head>
          <meta http-equiv="refresh" content="5">
          <meta charset='utf-8'>
          <title>MQTT Controller</title>
         </head>
         <body>
         `;

  mess += datatemp[datatemp.length - 1].time + ' Kolasa 8 Str. Minsk, Belarus' + '<br><br>';
  mess += 'Temperature: ' + datatemp[datatemp.length - 1].message + ' degrees <br>';
  mess += 'Humidity: ' + datahum[datahum.length - 1].message + ' % <br>';
  mess += 'Pressure: ' + datapress[datapress.length - 1].message + ' hPa <br>';
  mess += 'Altitude: ' + dataalt[dataalt.length - 1].message + ' m <br>';

  mess += `
         <form>
          <p>Введите температуру 0-100 градусов:</p>
          <p><input type='number' size='3' name='num' min='0' max='100' value='0'></p>
          <p>0 - выключить всё</p>
          <input type='checkbox' name='termopot' value='1'>Включить поддержание нагрева<Br>
          <p><input type='submit' value='Выполнить'></p>
         </form>
        </body>
       </html>
       `

  res.send(mess);
});

//wakeup server every 20 min
setInterval(function () {
  http.get("https://mysoft.herokuapp.com/");
}, 1200000); // every 20 minutes

app.listen(process.env.PORT || 3000, function () {
  console.log('Adress:localhost:3000');
});
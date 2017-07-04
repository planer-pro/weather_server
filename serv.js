var mqtt = require('mqtt'), url = require('url');
var express = require('express');
var app = express();
// Parse 
var mqtt_url = url.parse('mqtt://m21.cloudmqtt.com:12307');
var auth = ['ilgudqkb','OI7RNW8-uu2U'];
var url = "mqtt://" + mqtt_url.host;
var datatemp=[];
var datahum=[];
var datapress=[];
var dataalt=[];

var options = {
  port: mqtt_url.port,
  clientId: 'my cool client',
  username: auth[0],
  password: auth[1],
};

// Create a client connection
var client = mqtt.connect(url, options);

client.on('connect', () => {
	client.subscribe('#')
	client.publish('outdoor/sensors/bme280_getState', '1')
  /*client.subscribe('outdoor/sensors/bme280_temp')
  client.subscribe('outdoor/sensors/bme280_hum')
  client.subscribe('outdoor/sensors/bme280_press')
  client.subscribe('outdoor/sensors/bme280_alt')*/
});

client.on('message', (topic, message) => {
  switch (topic) {
    case 'outdoor/sensors/bme280_temp':
    datatemp.push({
    	message: message, 
    	time: new Date()
    })
    if(datatemp.length>43200)
    {
    	datatemp.shift()
    }
      break;

    case 'outdoor/sensors/bme280_hum':
    datahum.push({
    	message: message, 
    	time: new Date()
    })
    if(datahum.length>43200)
    datahum.shift()
      break;

    case 'outdoor/sensors/bme280_press':
    datapress.push({
    	message: message, 
    	time: new Date()
    })
    if(datapress.length>43200)
    datapress.shift()
      break;

    case 'outdoor/sensors/bme280_alt':
    dataalt.push({
    	message: message, 
    	time: new Date()
    })
    if(dataalt.length>43200)
    dataalt.shift()
      break;
  }
})

app.get('/', function (req, res) 
{
	//if (!message) return;
	if (datatemp.length==0 || datahum.length==0 || datapress.length==0
		|| dataalt.length==0)
	{
    res.send('Oops, something does wrong)');
    return;
}

    var mess = `
        <!DOCTYPE html>
        <html>
         <head>
          <meta charset='utf-8'>
          <title>MQTT Controller</title>
         </head>
         <body>
         `;

        mess += datatemp[datatemp.length - 1].time + '<br><br>';
        mess +='Temperature: ' + datatemp[datatemp.length - 1].message + ' degrees <br>';
		mess += 'Humidity: ' + datahum[datahum.length - 1].message + ' % <br>';
		mess +='Pressure: ' + datapress[datapress.length - 1].message + ' hPa <br>';
		mess += 'Altitude: ' + dataalt[dataalt.length - 1].message + ' m <br>';

   /* mess += `
          <form>
           <p>Введите температуру 0-100 градусов:</p>
           <p><input type='number' size='3' name='num' min='0' max='100' value='0'></p>
           <p>0 - выключить всё</p>
           <input type='checkbox' name='termopot' value='1'>Включить поддержание нагрева<Br>
           <p><input type='submit' value='Выполнить'></p>
          </form>
         </body>
        </html>
        `;*/

		res.send(mess);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Adress:localhost:3000');
});
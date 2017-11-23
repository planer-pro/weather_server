var mqtt = require('mqtt');

var mqtt_url = 'mqtt://m14.cloudmqtt.com';
var mqtt_port = 13682;
var auth = ['oixflctz', '-AgegtRMpwhG'];

var datatemp = [];
var datahum = [];
var datapress = [];
var dataalt = [];

var options = {
    port: mqtt_port,
    clientId: 'my cool client',
    username: auth[0],
    password: auth[1],
};

var client = mqtt.connect(mqtt_url, options);

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
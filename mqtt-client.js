var mqtt = require('mqtt');

var mqtt_url = 'mqtt://m14.cloudmqtt.com';
var mqtt_port = 13682;
var auth = ['oixflctz', '-AgegtRMpwhG'];

var data = [];

var options = {
    port: mqtt_port,
    clientId: 'my cool client',
    username: auth[0],
    password: auth[1],
};

var client = mqtt.connect(mqtt_url, options);

client.on('connect', () => {
    client.subscribe('outdoor/sensors/bme280_temp')
    client.subscribe('outdoor/sensors/bme280_hum')
    client.subscribe('outdoor/sensors/bme280_press')
    client.subscribe('outdoor/sensors/bme280_alt')
    client.publish('outdoor/sensors/bme280_getState', '1')
});

client.on('message', (topic, message) => {
    switch (topic) {
        case 'outdoor/sensors/bme280_temp':
            data.temp = "" + message
            //console.log(data.temp)
            break;

        case 'outdoor/sensors/bme280_hum':
            data.hum = "" + message
            break;

        case 'outdoor/sensors/bme280_press':
            data.press = "" + message
            break;

        case 'outdoor/sensors/bme280_alt':
            data.alt = "" + message
            break;
    }
})

module.exports = {
    data: data
}
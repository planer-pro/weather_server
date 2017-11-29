var mqtt = require('mqtt');

var mqtt_url = 'mqtt://m14.cloudmqtt.com';
var mqtt_port = 19478;
var auth = ['arqrndiv', 'DISLWUtOCYZ_'];

var data = {
    temp: [],
    hum: [],
    press: [],
    alt: []
};

var curData = [];

var options = {
    port: mqtt_port,
    clientId: 'my client',
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

var tempOld = "0";
var humOld = "0";
var pressOld = "0";
var altOld = "0";

function pushData(dir, message) {
    var time = new Date();

    if (dir == "temp") tempOld = message;
    if (dir == "hum") humOld = message;
    if (dir == "press") pressOld = message;
    if (dir == "alt") altOld = message;

    data.temp.push({ x: time, y: tempOld });
    data.hum.push({ x: time, y: humOld });
    data.press.push({ x: time, y: pressOld });
    data.alt.push({ x: time, y: altOld });
}

client.on('message', (topic, message) => {
    switch (topic) {
        case 'outdoor/sensors/bme280_temp':
            curData.temp = "" + message;
            pushData("temp", curData.temp);
            //console.log(data);
            break;

        case 'outdoor/sensors/bme280_hum':
            curData.hum = "" + message;
            pushData("hum", curData.hum);
            //console.log(data);
            break;

        case 'outdoor/sensors/bme280_press':
            curData.press = "" + message;
            pushData("press", curData.press);
            //console.log(data);
            break;

        case 'outdoor/sensors/bme280_alt':
            curData.alt = "" + message;
            pushData("alt", curData.alt);
            //console.log(data);
            break;
    }
    //console.log(data);
})

module.exports = {
    data: data,
    curData: curData
}
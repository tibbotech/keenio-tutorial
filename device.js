// require Keen.IO client module
const Keen = require('keen.io');

// require Tibbo's humidity/temperature meter and set it up to work with I2C line 4
const humTempMeter = require('tibbit-30').init("S5");

// Bing the client to your account
const client = Keen.configure({
    projectId: "57066..............a1279",
    writeKey: "0d2b95d4aa68................c3286608"
});

// Every minute..
setInterval(function(){
    // ..read environment data from the meter..
    var payload = humTempMeter.read();

    // ..and submit them to your event collection.
    client.addEvent("humtemp",  payload);
},60000);
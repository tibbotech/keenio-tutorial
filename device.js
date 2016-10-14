// require Keen.IO client module
const Keen = require('keen.io');

// require Tibbo's humidity/temperature meter and set it up to work with I2C line 4
const humTempMeter = require('@tibbo-tps/tibbit-30').init("S5");

// Bing the client to your account
const client = Keen.configure({
    projectId: "57066...........fe6a1279",
    writeKey: "0d2b95d4aa686e8274aa40604109d59c5..............4501378b3c193c3286608"
});

// Every minute..
setInterval(function(){
    // ..read environment data from the meter..
    var data = humTempMeter.getData();

    // ..check is everything correct..
    if(data.status === 1){
        var payload = {
            hum: data.humidity,
            temp: data.temperature
        };

        // ..and submit them to your event collection.
        client.addEvent("humtemp",  payload, function(err){
            if(err !== null){
                console.log(err);
            }
        });
    }
},60000);
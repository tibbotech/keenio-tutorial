const express = require("express");
const server = express();

const port = 3000;

server
    .use("/static", express.static('static'))
    .listen(port,function(){
        console.log("Listening on: "+port)
    });
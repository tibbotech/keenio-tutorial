const express = require("express");
const server = express();

const port = 3000;

server
    .use("/", express.static('static'))
    .listen(port,function(){
        console.log("Listening on: "+port)
    });
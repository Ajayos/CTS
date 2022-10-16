const express = require('express');
const _data = require('./index');
require('dotenv').config({ path: _data.env });
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var child_process = require("child_process");
const colors = require('colors');
var os = require("os");
const m = os.hostname();

console.log(m);
//process.exit()
child_process.exec("hostname -f", function(err, stdout, stderr) {
  var hostname = stdout.trim();
  console.log(hostname);
});
const app = new express();
app.use(morgan('dev'));
app.use(express.static('client'));
app.set("json spaces",2);
app.use(express.json());

const _path = process.cwd()


app.use("/api", require(_data.path.Routes +'/api.js'));

app.get("/route", (req, res) => {
    var host = req.get('host');
    console.log("Host: ", host)
    var origin = req.get('origin');
    console.log("Origin: ", origin)
    var userIP = req.socket.remoteAddress;
    console.log("UserIp: ", userIP)
    res.send("DNS host" + host +" origin: " + origin +" userIP : "+ userIP)
 });

app.use('/', function(req, res) {res.json({status: 'ok'})})
const mk = app.listen(PORT, () => {console.log(`Server Run on port ${PORT}`)});
//console.log(mk.address().address + mk.address().port);

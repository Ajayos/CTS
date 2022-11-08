'use strict'


const fs = require('fs');
const colors = require('colors');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socket = require('socket.io');
require('dotenv').config();
const bodyParser = require('body-parser');
const path_o = require('path');
const _path = path_o.resolve(__dirname, '.');
const path = require('path');
const pino = require('pino');

const logger = pino({
    transport: {
        target: 'pino-pretty', 
        options: { 
            ignore: 'hostname,pid,time,semicolon', 
            singleLine: false, 
            colorize: true, 
            levelFirst: true, 
            append: true, 
            mkdir: true,
        }
    }, 
    level: 'info',
});
const paths = {
    _: _path, 
    Auth: _path + '/Auth',
    src: _path + '/src',
    tmp: _path + '/tmp',
}
console.log(`----------------------------`.blue.bold);
if (!fs.existsSync('.env')) {
    console.log(`> env is not found`.red.bold);
    console.log(`----------------------------`.blue.bold);
    process.exit(0);
} else {
    console.log(`> env found`.green.bold)
};
console.log(`----------------------------`.blue.bold);

global.paths = paths;
global.__dirname = __dirname;
global.log = logger

const port = process.env.PORT ||  8080;
var host = process.env.HOST || 'http://127.0.0.1';
log.info(`> YOUR .env FILE is configured`.green.bold);
host = host.replace(/(^\w+:|^)\/\//, 'http://');//}
let host_ = host == 'http://127.0.0.1' ? 'http://127.0.0.1:' + port : host;
const io = socket(server,
    { 
        cors: { 
            origin: host
        } 
    }
);


app.use( (req, res, next) => {
    res.set('Cache-Control', 'no-store'); 
    req.io = io; 
    next();
});

io.setMaxListeners(0);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static('src/Public'))
//app.use(require('./src/index.js'));

app.get('/*', (req, res) => {res.status(404).end('404 - PAGE NOT FOUND')})
server.listen(port, log.info(`Server view on => ` + host_));

//setTimeout(() => {autostartInstance()}, 5000);

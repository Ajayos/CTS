'use strict'

const path = require('path');
const pino = require('pino');
module.exports.logger = pino({transport: { target: 'pino-pretty', options: { ignore: 'hostname,pid,time,semicolon', singleLine: false, colorize: true, levelFirst: true, append: true, mkdir: true }}, level: 'info' });
const fs = require('fs');
const path_o = require('path');
const _path = path_o.resolve(__dirname, '.');
require('dotenv').config({ path: _path +'/.env'});

module.exports = {
    __dirname: __dirname,
    env: _path + '/.env',
    _Path: _path,
    path: {
        _: _path,
        Routes: _path + '/Routes',
    }
}
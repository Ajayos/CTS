const _path = process.cwd()
const  _ = require('../index');
var express = require('express');
var router = express.Router();



router.get('/', function (req, res) {res.json({status: '200'})});
router.use(function (req, res) {res.status(404).json({status: '404'})});

module.exports = router

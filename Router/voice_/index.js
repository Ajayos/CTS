require('path');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => { res.sendFile(__dirname + '/index.html')});
router.get('/index.css', async(req, res) => { res.sendFile(__dirname + "/style.css")})
router.get('/index.js', async(req, res) => { res.sendFile(__dirname + "/app.js")});
router.get('/gif.gif', async(req, res) => { res.sendFile(__dirname + "/gif.gif")});

module.exports = router;
__path = process.cwd()

var express = require('express');
var router = express.Router();

// home page 
router.get('/', async(req, res) => {res.sendFile(__path + '/server/pages/home.html');});

// for 404 
router.use(function (req, res) {res.status(404).sendFile(__path + '/server/pages/404.html');});


/// sending files to the server pages

// css files
router.get('/css/main.css', async(req, res) => {res.sendFile(__path + '/server/css/main.css');});
router.get('/css/home.css', async(req, res) => {res.sendFile(__path + '/server/css/home.css');});

// js file
router.get('/js/jquery.js', async(req, res) => {res.sendFile(__path + '/server/js/jquery.js');});
router.get('/js/main.js', async(req, res) => {res.sendFile(__path + '/server/js/main.js');});

// image file
router.get('/images/server1.jpg', async(req, res) => {res.sendFile(__path + '/server/images/server1.jpg');});
router.get('/images/server2.jpg', async(req, res) => {res.sendFile(__path + '/server/images/server2.jpg');});
router.get('/images/server3.jpg', async(req, res) => {res.sendFile(__path + '/server/images/server3.jpg');});
router.get('/images/server4.jpg', async(req, res) => {res.sendFile(__path + '/server/images/server4.jpg');});
router.get('/images/server5.jpg', async(req, res) => {res.sendFile(__path + '/server/images/server5.jpg');});


module.exports = router
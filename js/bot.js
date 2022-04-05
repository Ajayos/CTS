__path = process.cwd()

var express = require('express');
var router = express.Router();


router.use('/gmgn', require(__path + '/tools/bin/gmgn.js'));
router.use('/time', require(__path + '/tools/bin/time.js'));
router.use('/startmsg', require(__path + '/tools/bin/startmsg.js'));
router.get('/', async(req, res) => {res.sendFile(__path + '/pages/home.html')})
//router.get('/gmgn', async(req, res) => {res.sendFile('')})
//router.get('', async(req, res) => {res.sendFile('')})

router.use(function (req, res) {res.status(404).sendFile(__path + '/pages/404.htm')});


module.exports = router

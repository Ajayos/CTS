const express = require('express')
var router = express.Router();
const axios = require('axios')
__path = process.cwd()
const fs = require('fs')

router.get('/', async(req, res) => {
	gn_text = ["😘𝙂𝙤𝙤𝙙 🙈𝙣𝙞𝙜𝙝𝙩 💫✨","🤗𝓖𝓸𝓸𝓭 🧚‍♀𝓷𝓲𝓰𝓱𝓽 ❄️✨","🌌❡០០ᖱ 🌙⩎ɨ❡ϦƬ 🌎","😘ցօօժ ⭐️ղíցհԵ 💝","🌃Ꮐᝪᝪᗞ 🙈ᑎᏆᏀᕼᎢ 💫✨"];
    gm_text = ["❀🍃Good❀ ❀morning❀🥰❀","☘️𝐺𝑜𝑜𝑑 🌅𝑚𝑜𝑟𝑛𝑖𝑛𝑔 💐","🍃𝙶𝚘𝚘𝚍 🌻𝚖𝚘𝚛𝚗𝚒𝚗𝚐 🥰","🍀𝗚𝗼𝗼𝗱 😘𝗺𝗼𝗿𝗻𝗶𝗻𝗴 🌸","🌻𝓖𝓸𝓸𝓭 𝓶𝓸𝓻𝓷𝓲𝓷𝓰 💞","🌼🅖🅞🅞🅓 🅜🅞🅡🅝🅘🅝🅖 🐶","🍃Ⓖⓞⓞⓓ 🌈ⓜⓞⓡⓝⓘⓝⓖ 🥰"];   
	var gn = Math.floor(5*Math.random());
	var gm = Math.floor(7*Math.random());
	res.json({
		gn: gn_text[gn],
		gm: gm_text[gm]
	});
});


module.exports = router

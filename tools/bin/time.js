const express = require('express')
var router = express.Router();
const axios = require('axios')
__path = process.cwd()
const fs = require('fs')

router.get('/', async(req, res) => {
        const hrs = new Date().getHours({ timeZone: 'Asia/Kolkata' });
        const min = new Date().getMinutes({ timeZone: 'Asia/Kolkata' });
        const sec = new Date().getSeconds({ timeZone: 'Asia/Kolkata' });
        const day = new Date().getDate({ timeZone: 'Asia/Kolkata' });
        const mon = new Date().getMonth({ timeZone: 'Asia/Kolkata' });
        const year = new Date().getFullYear({ timeZone: 'Asia/Kolkata' });

        gn_text = ["😘𝙂𝙤𝙤𝙙 🙈𝙣𝙞𝙜𝙝𝙩 💫✨","🤗𝓖𝓸𝓸𝓭 🧚‍♀𝓷𝓲𝓰𝓱𝓽 ❄️✨","🌌❡០០ᖱ 🌙⩎ɨ❡ϦƬ 🌎","😘ցօօժ ⭐️ղíցհԵ 💝","🌃Ꮐᝪᝪᗞ 🙈ᑎᏆᏀᕼᎢ 💫✨"];
        gm_text = ["❀🍃Good❀ ❀morning❀🥰❀","☘️𝐺𝑜𝑜𝑑 🌅𝑚𝑜𝑟𝑛𝑖𝑛𝑔 💐","🍃𝙶𝚘𝚘𝚍 🌻𝚖𝚘𝚛𝚗𝚒𝚗𝚐 🥰","🍀𝗚𝗼𝗼𝗱 😘𝗺𝗼𝗿𝗻𝗶𝗻𝗴 🌸","🌻𝓖𝓸𝓸𝓭 𝓶𝓸𝓻𝓷𝓲𝓷𝓰 💞","🌼🅖🅞🅞🅓 🅜🅞🅡🅝🅘🅝🅖 🐶","🍃Ⓖⓞⓞⓓ 🌈ⓜⓞⓡⓝⓘⓝⓖ 🥰"];   
	    var gn = Math.floor(5*Math.random());
	    var gm = Math.floor(7*Math.random());

        if (hrs < 12) wish = gm_text[gm]; //'ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ ⛅';
        if (hrs >= 12 && hrs <= 17) wish = 'ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ 🌞';
        if (hrs >= 17 && hrs <= 19) wish = 'ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ 🌥';
        if (hrs >= 19 && hrs <= 24) wish = gn_text[gn]; //'ɢᴏᴏᴅ ɴɪɢʜᴛ 🌙';
        moths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        arry = ["0","1","2","3","4","5","6","7","8","9","10","11","12","1","2","3","4","5","6","7","8","9","10","11","12"];
        ampm = hrs >= 12 ? 'PM' : 'AM';
	res.json({
		hr: hrs,
        ihr: arry[hrs],
        min: min,
        sec: sec,
        ampm: ampm,
        day:  day,
        month: mon,
        months: moths[mon],
        year: year,
        wish: wish 
	});
});


module.exports = router

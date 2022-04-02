const express = require('express');
var router = express.Router();
const axios = require('axios');
__path = process.cwd();
const fs = require('fs');

router.get('/', async(req, res) => {
        var d = new Date();
        const hrs = d.getHours().toString().padStart(2, 0);
        const min = d.getMinutes().toString().padStart(2, 0);
        const sec = d.getSeconds().toString().padStart(2, 0);
        const day = d.getDate();
        const mon = d.getMonth();
        const year = d.getFullYear();

        var gmgn = await axios.get('https://ajay-o-s.herokuapp.com/bot/gmgn');
        
		var gm = gmgn.data.gm;
		var gf = gmgn.data.gf;
		var ge = gmgn.data.ge;
        var gn = gmgn.data.gn;

        if (hrs < 12) wish = gm;
        if (hrs >= 12 && hrs <= 17) wish = gf;
        if (hrs >= 17 && hrs <= 19) wish = ge;
        if (hrs >= 19 && hrs <= 24) wish = gn;

        moths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        hour = hrs==00 ? 0 : hrs==01 ? 1 : hrs==02 ? 2 : hrs==03 ? 3 : hrs==04 ? 4 : hrs==05 ? 5 : hrs==06 ? 6 : hrs==07 ? 7 : hrs==08 ? 8 : hrs==09 ? 9 : hrs; 
        arry = ["0","1","2","3","4","5","6","7","8","9","10","11","12","1","2","3","4","5","6","7","8","9","10","11","12"];
        ampm = hrs >= 12 ? 'PM' : 'AM';

	res.json({
		hr: hrs,
        ihr: arry[hour],
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
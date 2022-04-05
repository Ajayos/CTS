const express = require('express');
var router = express.Router();
const axios = require('axios');
__path = process.cwd();
const fs = require('fs');

router.get('/', async(req, res) => {
    
    const welcm_1 = ["HEY"];
    const welcm_2 = ["Iam online🥰 \n Njan Eppo Private Moodeill annu Bossinnu mathrame enne condroll akkan pattu"];
    const welcm_3 = ["Iam online🥰 \n Njan Eppo Public Moodeill annu"];

    var welc1_len = welcm_1.length;
    var welc2_len = welcm_2.length;
    var welc3_len = welcm_3.length;
        
    var wel_1 = Math.floor(welc1_len*Math.random());
    var wel_2 = Math.floor(welc2_len*Math.random());
    var wel_3 = Math.floor(welc3_len*Math.random());


	res.json({
		welc_1: wel_1,
        welc_private: wel_2,
        welc_public: wel_3
	});
});


module.exports = router
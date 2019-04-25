var express = require('express');
var router = express.Router();
var key = require('../config/keys');
var path = require('path');

/* GET users listing. */
router.post('/', function(req, res) {
    let answear;
    let rq = req.body;
    console.log(rq);
    if(rq.password === 'thebroysneverdie'){
        answear = {
            success: true,
            key: key.secretKey,
            login: true,
            redirectUrl: '/editPage?key='
        };
        res.status(200).json(answear);
    } else {
        answear = {
            success: false
        };
        res.status(200).json(answear);
    }
});

router.post('/gotoAdmin', function (req,res) {
   if(req.body.key === key.secretKey){
      // res.status(200).redirect('/api/login/editPage?key='+key.secretKey);
       res.status(200).json({login: true, redirectUrl: '/editPage?key='})
   } else {
       res.status(200).json({login: false});
   }
});



module.exports = router;

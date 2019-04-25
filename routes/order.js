var express = require('express');
var router = express.Router();
var path = require('path');
var nodemailer = require('nodemailer');
var config = require('../config/keys');


/* GET home page. */
router.post('/:type', function (req, res) {
    console.log(req);
    if (req.body.request_key === config.secretKey) {
        switch (req.params.type) {
            case 'mail': {
                sendEmail(req, res);
                break;
            }
        }
    } else {
        res.status(401).json('Need api key');
    }
});

function sendEmail(req, res) {
    var transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: config.emailLogin,
            pass: process.env.PASS
        }
    });

    let html = `
        <div>
            <h1>Обращение с сайта Лидер</h1>
            <h3>Имя:</h3>
            <span>${req.body.name}</span>
            <h3>Номер:</h3>
            <span>${req.body.phone}</span>
            <h3>Текст сообщения:</h3>
            <span>${req.body.info}</span>
        </div>
   `;
    var mailOptions = {
        from: '"Лидер" <iqlex1@yandex.ru>',
        to: config.emailReceiver,
        subject: 'Обращение с сайта Лидер',
        html: html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json('Email sent');
        }
    });
}

module.exports = router;

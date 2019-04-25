var feedback = require('../models/Feedback');
var express = require('express');
var router = express.Router();
var moment = require('moment');

router.post('/phone', async function(req,res) {
    let lastNumber = 0;
    let lastFeedback = await feedback
        .findOne({})
        .sort({number: -1});
    let feedbacks = await feedback.find({});
    if (feedbacks.length < 1) {
        lastNumber = 1;
    } else {
        if (lastFeedback.number) {
            lastNumber = lastFeedback.number + 1;
        }
    }
    moment.locale('ru');

    const candidate = new feedback({
        phone: req.body.phone,
        editionInfo: "Заказ звонка",
        number: lastNumber,
        date: moment().format('LL')
    });
    await candidate.save();
    console.log(`Обращение №${lastNumber} добавлено!`);
    res.status(200).json(`Обращение №${lastNumber} добавлено!`);
});

router.post('/program', async function(req,res) {
    let lastNumber = 0;
    let lastFeedback = await feedback
        .findOne({})
        .sort({number: -1});
    let feedbacks = await feedback.find({});
    if (feedbacks.length < 1) {
        lastNumber = 1;
    } else {
        if (lastFeedback.number) {
            lastNumber = lastFeedback.number + 1;
        }
    }
    moment.locale('ru');

    const candidate = new feedback({
        phone: req.body.phone,
        name: req.body.name,
        number: lastNumber,
        editionInfo: req.body.editionInfo,
        date: moment().format('LL')
    });
    await candidate.save();
    console.log(`Обращение №${lastNumber} добавлено!`);
    res.status(200).json(`Обращение №${lastNumber} добавлено!`);
});

router.get('/all', async function(req,res) {
    let feedbacks = await feedback
        .find({})
        .sort({number: -1});

    res.status(200).json(feedbacks);
});

module.exports = router;

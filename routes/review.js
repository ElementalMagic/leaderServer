var express = require('express');
var router = express.Router();
var keys = require('../config/keys');
var upload = require('../middleware/upload');
var Review = require('../models/Review');
var moment = require('moment');

function checkSign(req, res) {
    if (req.body.key === keys.secretKey) {
        return true;
    } else {
        res.status(401).json({message: 'У вас нет прав доступа'});
        return false;
    }
}

router.post('/new', upload.single('image'), async (req, res) => {
    if (checkSign(req, res)) {
        try {
            let lastNumber = 0;
            let lastReview = await Review
                .findOne({})
                .sort({number: -1});

            let reviews = await Review.find({});
            if (reviews.length < 1) {
                lastNumber = 1;
            } else {
                if (lastReview.number) {
                    lastNumber = lastReview.number + 1;
                }
            }
            const rightPath = req.file.path;
            const path = rightPath.replace('images\\', 'images/');
            let review = req.body;
            const candidate = new Review({
                name: review.name,
                number: lastNumber,
                image: req.file ? path : '',
                content: req.body.content
            });
            await candidate.save();
            res.status(200).json(`Отзыв №${lastNumber} добавлен`);
        } catch (e) {
            console.log(e.message);
            res.status(400).json('Что-то пошло не так. Попробуйте позже.')
        }
    }
});

router.delete('/all', upload.single('image'), async (req, res) => {
    if (checkSign(req, res)) {
        try {
            await Review.deleteMany({}, (err) => console.log(err));
            res.status(200).json('Deleted');
        } catch (e) {
            console.log(e.message);
            res.status(400).json('Что-то пошло не так. Попробуйте позже.')
        }
    }
});

router.delete('/deleteOne', upload.single('image'), async (req, res) => {
    console.log(req.body);
    if (checkSign(req, res)) {
        try {
            await Review.findOneAndDelete({number: req.body.number}, (err) => console.log(err));
            res.status(200).json('Deleted');
        } catch (e) {
            console.log(e.message);
            res.status(400).json('Что-то пошло не так. Попробуйте позже.')
        }
    }
});

router.get('/all', async (req, res) => {
    try {
        let reviews = await Review.find({}).sort({number: -1});
        res.status(200).json(reviews);
    } catch (e) {
        console.log(e.message);
        res.status(400).json('Что-то пошло не так. Попробуйте позже.')
    }
});

router.patch('/edit', upload.single('image'), async (req, res) => {
    try {
        if (checkSign(req, res)) {
            console.log(req.body);
            let updated = {
                name: req.body.name,
                number: req.body.number,
                content: req.body.content
            };

            if (req.file) {
                const rightPath = req.file.path;
                const path = rightPath.replace('images\\', 'images/');
                updated.image = path;
            }

            await Review.findOneAndUpdate(
                {
                    number: req.body.number
                },
                {
                    $set: updated
                },
                {new: true});
            res.status(200).json(updated);
        }
    } catch (e) {
        console.log(e.message);
        res.status(400).json('Что-то пошло не так. Попробуйте позже.');
    }
});

module.exports = router;


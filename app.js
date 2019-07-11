var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var compression = require('compression');
var mongoose = require('mongoose');
var orderRouter = require('./routes/order');
var loginRouter = require('./routes/login');
var reviewRouter = require('./routes/review');
var feedbackRouter = require('./routes/feedback');
var multer = require('multer');
var keys = require('./config/keys.js');
var fs = require('fs');
var app = express();

/*mongoose
    .connect(keys.mongoURI)
    .then(() => console.log("MongoDB connected."))
    .catch(error => console.log(error));*/

app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

/*app.get('*', function (req, res, next) {
    if (req.hostname === 'lenfincentr.ru' || !process.env.CHECKDOMAIN) {
        next();
    } else {
        res.status(301).redirect('https://lenfincentr.ru');
    }
});*/


app.get('/projects', (req, res) => {
    res.status(200).sendFile(path.resolve('../leader/projects.html'))
});
app.get('/about', (req, res) => {
    res.status(200).sendFile(path.resolve('../leader/about.html'))
});


app.get('*', function (req, res, next) {
    if (req.path.endsWith('.html')) {
        res.sendFile(path.resolve('../leader/NotFound.html'))
    } else {
        next();
    }
});

app.use(express.static(path.resolve('../leader')));
app.get("/images/:id", function (req, res, next) {
    let find = false;
    let id = req.params.id;
    fs.readdir(path.resolve('images'), function (err, items) {
        items.forEach(function (item) {
            if (item === id) {
                console.log(path.resolve(__dirname + '/images/' + id));
                find = true;
                res.sendFile(path.resolve(__dirname + '/images/' + id));
            }
        });
        if (!find) {
            next();
        }
    });

});
app.use("/docs", express.static("docs"));

app.use('/api/order', orderRouter);
/*app.use('/api/login', loginRouter);
app.use('/api/review', reviewRouter);
app.use('/api/feedback', feedbackRouter);*/
app.use('/404', (req, res) => {
    res.status(404).sendFile(path.resolve('../leader/NotFound.html'))
});
app.use('/', (req, res, next) => {
    if (req.path != "/") {
        next();
    }
    res.status(200).sendFile(path.resolve('../leader/index.html'));
});

app.use('*', (req, res) => {
    res.status(404).redirect('https://zkbi-lider.ru/404');
});
module.exports = app;

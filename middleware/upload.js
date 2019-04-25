const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'images//')
    },
    filename(req, file, cb){
        const date = moment().format('DDMMYYY-HHmmss_SSS');
        cb(null, `${date}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/webp' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true);
    }  else {
        cb(null, false);
    }
};

const limits = {
    fileSize: 1024*1024*5
};

module.exports = multer({
    storage,
    fileFilter,
    limits
});

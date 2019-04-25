const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prodtype = new Schema({
    name:{
        type: String,
        required: true
    },

    number:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model('reviews', prodtype);

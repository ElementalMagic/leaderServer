const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedback = new Schema({
    name:{
        type: String,
        default: 'client'
    },
    phone:{
       type: String,
       required: true
    },
    number:{
      type: Number,
      required: true
    },
    editionInfo:{
        type: String,
        default: ""
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model('feedback', feedback);

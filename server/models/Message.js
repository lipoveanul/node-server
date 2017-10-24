const mongoose = require('mongoose');

let Message = mongoose.model('Message', {
    msg: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    response: {
        type: [String]
    },
    topic: {
        type: String
    }
});

module.exports = {Message};
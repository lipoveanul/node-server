const mongoose = require('mongoose');

let Message = mongoose.model('Message', {
    msg: {
        type: String,
        required: true
    }
});

module.exports = {Message};
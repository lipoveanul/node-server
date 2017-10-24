const mongoose = require('mongoose');

let User = mongoose.model('User', {
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: 'admin@example.com'
    },
    password: {
        type: String,
        default: 'admin'
    },
    avatar: {
        type: String
    },
    status: {
        type: Number
    },
    description: {
        type: String
    }
});

module.exports = {User};
const express = require('express');
const BodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Message} = require('./models/Message');
const {User} = require('./models/User');
const {ObjectID} = require('mongodb');

const port = process.env.PORT || 3000;

let app = express();

app.use(BodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS");
    next();
});

app.get('/messages', (req, res) => {
    Message.find().then((mes) => {
        res.status(200).send(mes);
    }, (err) => {
        res.status(400).send();
    })
})

app.post('/messages', (req, res) => {

    let message = new Message({
        msg: req.body.msg,
        date: req.body.date,
        response: req.body.response

    });
    message.save().then((doc) => {
        res.status(200).send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.delete('/messages/:id',(req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Message.findByIdAndRemove(id).then((mes) => {
        if (!mes) {
            return res.status(404).send();
        }
        res.send(mes);
    }).catch((err) => {
        res.status(400).send();
  });
});

app.patch('/messages/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['msg', 'response']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Not a valid id');
    }
    Message.findByIdAndUpdate(id, {$set: {msg: body.msg}, $push: {response: body.response}}, 
        {new: true}).then((mes) => {
            if(!mes) {
                return res.status(404).send('Empty value');
            }
            res.status(200).send(mes);
        }).catch((err) => {
            res.status(400).send();
        });

});

app.get('/users', (req, res) => {
    User.find().then((mes) => {
        res.status(200).send(mes);
    }, (err) => {
        res.status(400).send();
    })
})

app.post('/users', (req, res) => {

    let user = new User({
        nickname: req.body.nickname,
        email: req.body.email,
        avatar: req.body.avatar

    });
    user.save().then((doc) => {
        res.status(200).send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.delete('/users/:id',(req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    User.findByIdAndRemove(id).then((mes) => {
        if (!mes) {
            return res.status(404).send();
        }
        res.send(mes);
    }).catch((err) => {
        res.status(400).send();
  });
});

app.patch('/users/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nickname', 'email', 'password', 'avatar','description','status']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Not a valid id');
    }
    User.findByIdAndUpdate(id, {$set: body}, {new: true}).then((mes) => {
            if(!mes) {
                return res.status(404).send('Empty value');
            }
            res.status(200).send(mes);
        }).catch((err) => {
            res.status(400).send();
        });

});



app.listen(port, () => {
    console.log(`Server starting at ${port}`);
})
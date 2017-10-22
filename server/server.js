const express = require('express');
const BodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Message} = require('./models/Message');
const {ObjectID} = require('mongodb');

const port = process.env.PORT || 3000;

let app = express();

app.use(BodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/JavaScript', (req, res) => {
    Message.find().then((mes) => {
        res.status(200).send(mes);
    }, (err) => {
        res.status(400).send();
    })
})

app.post('/JavaScript', (req, res) => {

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

app.delete('/JavaScript/:id',(req, res) => {
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


app.listen(port, () => {
    console.log(`Server starting at ${port}`);
})
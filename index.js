const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
  if (err !== null) {
  } else {
    app.locals.db = client.db('sistemas_solares');
  }
});

let sistemas = require('./sistemas_solares');
app.use('/sistemas', sistemas);

app.listen(3000);
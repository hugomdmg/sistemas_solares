const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;


MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
  if (err !== null) {
  } else {
    app.locals.db = client.db('sistemas_solares');
  }
});

let sistemas = require('./sistemas_solares');
app.use('/sistemas', sistemas);

let usuarios = require('./usuarios');
app.use('/usuarios', usuarios);

app.listen(3000);
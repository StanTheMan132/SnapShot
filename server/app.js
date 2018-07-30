const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('GOOD LUCK MY FRIENDS AND LETS GET THIS GOING');
});

app.use((req, res, next) => {
  res.status(404).send('route doesnt exist yet m8');
});

module.exports = app;

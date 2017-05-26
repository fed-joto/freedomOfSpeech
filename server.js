const express = require('express');
const Twitter = require('twitter');
const app = express();
const countryData = require('./assets/data.json');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const fs = require('fs');

app.set('view engine', 'pug');
app.use(express.static('assets'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const client = new Twitter({
  consumer_key: 'PRc0MaBJZksAx03vEcPYLWwva',
  consumer_secret: 'Ysz30JViNJ8OzLfyhAdWNpUKgKFz0pXoaQsK5QUzRY1bz8WkpI',
  access_token_key: '856864606530273280-hKZHLjTfSNWeVhLCruySRvkHNs13L15',
  access_token_secret: 'ppyS574ED1XSNxMVtBUqUKgqlViW8EBcPA0av6MAo7keC'
});

app.get('/:country?', (req, res) => {

   const currCountry = req.params.country
       ? countryData.filter(x => x.name.toLowerCase() === req.params.country.replace('-', ' '))[0]
       : '';

   client.get('search/tweets', { q: 'freedomofspeech' }, (error, tweets, response) => {

       res.render('index', {
           title: 'Freedom of Speech',
           countryData: countryData,
           tweets: tweets.statuses,
           country: currCountry
       });

   });
});


io.on('connection', (socket) => {
    console.log('Connected');
    var stream = client.stream('statuses/filter', { track: 'freedomofspeech' });
    stream.on('data', tweet => io.emit('stream', tweet));
    stream.on('error', console.log);
});

server.listen(3000, () => {
    console.log('App running on http://localhost:3000');
});

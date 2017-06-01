const express = require('express');
const Twitter = require('twitter');
const app = express();
const main = require('./views/main');

app.use(express.static('assets'));

const client = new Twitter({
  consumer_key: 'PRc0MaBJZksAx03vEcPYLWwva',
  consumer_secret: 'Ysz30JViNJ8OzLfyhAdWNpUKgKFz0pXoaQsK5QUzRY1bz8WkpI',
  access_token_key: '856864606530273280-hKZHLjTfSNWeVhLCruySRvkHNs13L15',
  access_token_secret: 'ppyS574ED1XSNxMVtBUqUKgqlViW8EBcPA0av6MAo7keC'
});

app.get('/:country?', (req, res) => {
   client.get('search/tweets', { q: 'freedomofspeech' }, (err, tweets, response) => {
       res.send(main(tweets));
   });
});

app.listen(3000, () => {
    console.log('App running on http://localhost:3000');
});

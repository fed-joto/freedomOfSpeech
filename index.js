const express = require('express');
const Twitter = require('twitter');
const app = express();
const countryData = require('./assets/data.json');

app.set('view engine', 'pug');
app.use(express.static('assets'))
 
const client = new Twitter({
  consumer_key: 'xNaVeODPlBAdhkwmL9zmHjOO4',
  consumer_secret: 'wDo1qPRLvSxc6QafOOF41QRXr13i5r8tonZfbkCJJTV7eykD4a',
  access_token_key: '856864606530273280-vQbERAlzy8J4Szz77jpX55YxRqaHCO2',
  access_token_secret: 'V6Zz5sf6GXbPc2tKTbMV1rQCCiSiUgODNFpAygYZUYWPo'
});

app.get('/', (req, res) => {
    client.get('search/tweets', { q: 'freedomofspeech' }, (error, tweets, response) => {
        console.log(tweets.statuses);
        res.render('index', {
            title: 'Freedom of Speech',
            countryData: countryData,
            tweets: tweets.statuses
        });
    });
    
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
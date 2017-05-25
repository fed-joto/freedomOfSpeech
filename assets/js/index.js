document.addEventListener('DOMContentLoaded', () => {

    const socket = io.connect('http://localhost:3000');
    socket.on('stream', console.log);
    socket.send('Hello from front end');

//    h3.twitter__title Twitter #FreedomOfSpeech
//    ul.twitter__tweets
//    each tweet in tweets
//    li.twitter__tweet
//    img(class="twitter__user-avatar" src=tweet.user.profile_image_url_https alt="Avatar")
//    .twitter__content
//    span.twitter__username= tweet.user.screen_name
//    p.twitter__text= tweet.text
//
    var stream = client.stream('statuses/filter', {track: 'javascript'});
    stream.on('data', function(event) {
      console.log(event && event.text);
    });

    stream.on('error', function(error) {
          throw error;
    });


    if (currCountry) {
        prepareCountryInfo(currCountry, document.querySelector('.country-info'));
    }

    window.onpopstate = event => console.log(event);

    function renderCountryInfo(country) {
        return `
            <span class="country-info__ranking-number"># ${country.rank}</span>
            <h2 class="country-info__title" data-id="${country.id}">${country.name}</h2>
            <canvas id="doughnut-chart" width="800" height="450"></canvas>
            <p class="country-info__progression">${country.progression}</p>
            <p class="country-info__rank2015">${country.rank2015}</p>
            <p class="country-info__score2015">${country.score2015}</p>
        `;
    }

    function prepareCountryInfo(country, infoDiv) {
        if (country.id === document.querySelector('.country-info__title').dataset['id']) return removeAllBodyClasses();

        document.body.classList = 'country-info-visible';
        const currCountry = countryData.filter((x) => x.id === country.id)[0];
        history.pushState("object or string", "Title", "/" + currCountry.name.toLowerCase().replace(' ', '-'));
        document.getElementById(country.id).style.fill = getColorByScore(currCountry.score);

        infoDiv.innerHTML = renderCountryInfo(currCountry);
        renderPieChart(currCountry.score, getColorByScore(currCountry.score));
    }

    function openSection(e) {
        let target = e.target.closest('li').dataset.id;
        let bodyClass = document.body.classList;

        if (bodyClass.contains(target + '-visible')) return document.body.classList = '';
        document.body.classList = '';
        bodyClass.add(target + '-visible');
    }

    // Search
    const searchBox = document.querySelector('.search-box input');
    searchBox.addEventListener('keyup', searchResult);

    function searchResult() {

        allCountries.forEach(x => x.style.fill = '');

        const searchStr = searchBox.value.toLowerCase().trim();

        if (searchStr.length < 1) return;

        countryData
            .filter(x => x.name.toLowerCase().indexOf(searchStr) > -1)
            .forEach(x => {
                let el = document.getElementById(x.id);
                el.style.fill = getColorByScore(x.score);
            });
    }

    // Pie Charts
    function renderPieChart(score, color) {
        new Chart(document.getElementById("doughnut-chart"), {
            type: 'doughnut',
            data: {
            labels: ["Score", "Max is 100"],
            datasets: [{
                label: "Population (millions)",
                backgroundColor: [color, "#f3f3f3"],
                data: [score, 100 - score]
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Score 2016'
                }
            }
        });
    }

    const allCountries = document.querySelectorAll('path');
    allCountries.forEach(country => country.addEventListener('click', (e) => {
        e.stopPropagation();
        prepareCountryInfo(e.target, document.querySelector('.country-info'));
    }));

    const menuItems = document.querySelectorAll('.navigation__list-item');
    menuItems.forEach(item => item.addEventListener('click', openSection));

    allCountries.forEach(country => {
        country.addEventListener('mouseover', el => el.target.style.fill = 'pink');
        country.addEventListener('mouseout', el =>  el.target.style.fill = '');
    });


    document.querySelector('.map').addEventListener('click', removeAllBodyClasses);

    // gör om gör rätt:
    document.querySelector('.header__logo').addEventListener('click', removeAllBodyClasses);

    const situationNumbers = [
        { name: 'Good', min: 0, max: 20, color: 'rgb(255, 255, 255)', class: 'good' },
        { name: 'Satisfactory situation', min: 20, max: 40, color: 'rgb(30, 250, 200)', class: 'satisfactory' },
        { name: 'Noticable problem', min: 40, max: 60, color: 'rgb(200, 170, 20)', class: 'noticable' },
        { name: 'Difficult situation', min: 60, max: 80, color: 'rgb(230, 30, 0)', class: 'difficult' },
        { name: 'Very serious situation', min: 80, max: 100, color: 'rgb(0, 0, 0)', class: 'serious' }
    ];

    situationNumbers.forEach(situation => {
        const el = document.createElement('li');
        el.dataset['min'] = situation.min;
        el.dataset['max'] = situation.max;
        el.innerHTML = situation.name;
        el.classList.add('ranking-categories__item');

        el.addEventListener('mouseover', e => {
            countryData
                .filter(country => country.score > e.target.dataset['min'] && country.score <= e.target.dataset['max'])
                .forEach(x => document.getElementById(x.id).classList.add(situation.class));
        });
        el.addEventListener('mouseleave', removeClass);

        el.addEventListener('click', e => {
            countryData
                .filter(country => country.score > e.target.dataset['min'] && country.score <= e.target.dataset['max'])
                .forEach(x => document.getElementById(x.id).classList.add(situation.class));
            document.querySelectorAll('.ranking-categories__item').forEach(situation => situation.addEventListener('mouseover', e => {
                countryData
                    .filter(country => country.score > e.target.dataset['min'] && country.score <= e.target.dataset['max'])
                    .forEach(x => document.getElementById(x.id).classList.add(situation.class));
            }));
            e.target.removeEventListener('mouseleave', removeClass);
        });

        document.querySelector('.ranking-categories').appendChild(el);
    });

    function removeClass() {
        allCountries.forEach(x => x.classList = '');
    }

    function getColorByScore(score) {
        return 'rgb(' + Math.round(score) * 4 + ', 150 , 100)';
    }

    function removeAllBodyClasses() {
        history.pushState(null, null, '/');
        return document.body.classList = '';
    }

});

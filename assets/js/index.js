const worldMap = require('./map.js');
const continents = require('./continents.js');
const countryData = require('../data.json');

document.addEventListener('DOMContentLoaded', () => {

    const situations = [
        { name: 'Good', min: 0, max: 20 },
        { name: 'Satisfactory situation', min: 20, max: 40 },
        { name: 'Noticable problem', min: 40, max: 60 },
        { name: 'Difficult situation', min: 60, max: 70 },
        { name: 'Very serious situation', min: 70, max: 100 }
    ];

	if (window.innerWidth > 950) { // make work on resize aswell
		document.querySelector('.map').innerHTML = worldMap;
	} else {
        document.querySelector('.c-slider__container').innerHTML = continents.map(continent => `
            <div class="c-slider__slide">${continent}</div>
		`).join('');
	}

    const completeCountries = countryData.map(country => {
        country.situation = situations.filter(x => country.score > x.min && country.score <= x.max)[0].name
        country.el = document.getElementById(country.id);
        country.onclick = country.el.addEventListener('click', e => {
            e.stopPropagation();
            prepareCountryInfo(country, document.querySelector('.country-info'));
        });

        country.addActive = () => country.el.classList.add('active');
        country.removeActive = () => country.el.classList = '';
        country.dashedName = country.name.toLowerCase().replace(' ', '-')
        return country;
    });

    function removeActive() {
        completeCountries.forEach(country => country.removeActive());
    }

    situations.forEach(situation => {
        const el = document.createElement('li');
        el.classList.add('ranking-categories__item');
        el.innerHTML = situation.name;

        el.addEventListener('mouseover', e => {
            completeCountries.forEach(country => country.removeActive());
            el.addEventListener('mouseout', removeActive);
            completeCountries
                .filter(country => situation.name === country.situation)
                .forEach(country => country.addActive());
        });

        el.addEventListener('click', e => {
            el.removeEventListener('mouseout', removeActive, false);
            completeCountries
                .filter(country => situation.name === country.situation)
                .forEach(country => country.addActive());
        });

        el.addEventListener('mouseout', removeActive);

        document.querySelector('.ranking-categories').appendChild(el);
    });

    function renderCountryInfo(country) {
        return `
            <h2 class="country-info__title" data-id="${country.id}">${country.name}</h2>
            <span class="country-info__ranking-number">
                <div>Ranking</div>${country.rank}
            </span>
            <canvas id="doughnut-chart" width="800" height="450"></canvas>
            <p class="country-info__progression">
                <span>Progression:</span>${country.progression}
            </p>
            <p class="country-info__rank2015">
                <span>Ranking 2015:</span>${country.rank2015}
            </p>
            <p class="country-info__score2015">
                <span>Score 2015:</span>${country.score2015}
            </p>
        `;
    }

    function prepareCountryInfo(country, infoDiv) {
        removeActive();
        country.addActive();
        document.body.classList = 'country-info-visible';
        history.pushState(null, null, '/'  + country.dashedName);

        infoDiv.innerHTML = renderCountryInfo(country);
        renderPieChart(country.score, '#b90102');
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

        completeCountries.forEach(country => country.removeActive());

        const searchStr = searchBox.value.toLowerCase().trim();

        if (searchStr.length < 1) return;

        completeCountries
            .filter(country => country.name.toLowerCase().indexOf(searchStr) > -1)
            .forEach(country => country.addActive());
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

    const menuItems = document.querySelectorAll('.navigation__list-item');
    menuItems.forEach(item => item.addEventListener('click', openSection));

    document.querySelector('.map').addEventListener('click', e => {
        removeAllBodyClasses(e);
        removeActive();
    });

    document.querySelector('.header__logo').addEventListener('click', e => {
        removeAllBodyClasses(e);
        removeActive();
    });

    document.querySelector('.c-slider').addEventListener('click', e => {
        removeAllBodyClasses(e);
        removeActive();
    });

    function removeAllBodyClasses(e) {
        e.stopPropagation();
        history.pushState(null, null, '/');
        return document.body.classList = '';
    }

    const url = window.location.href.split('/')
    const queryString = url[url.length - 1]
    const currCountry = countryData.filter(x => x.name.toLowerCase() === queryString.replace('-', ' '))[0];
    
    if (currCountry) {
        prepareCountryInfo(currCountry, document.querySelector('.country-info'));
    }

    // Mobile version
    const slider = HammerSlider(document.getElementById('hammer-slider'), {
      slideSpeed: 60,
      slideShow: false,
      dots: false,
      mouseDrag: true
    });

    const mobileMenu = document.querySelector('.mobile__menu');
    const menuIcon = document.querySelector('.navigation--mobile');
    menuIcon.addEventListener('click', (e) => {
        removeAllBodyClasses(e);
        mobileMenu.classList.add('mobile__menu--active');
    });

    const afterItemClick = document.querySelectorAll('.navigation__list-item--mobile');
    afterItemClick.forEach(x => {
        x.addEventListener('click', () => {
            mobileMenu.classList.remove('mobile__menu--active');
        });
    });

    const close = document.getElementById('close');
    close.addEventListener('click', closeMenu);

    function closeMenu(e) {
       mobileMenu.classList.remove('mobile__menu--active');
       return removeAllBodyClasses(e);
    }
});

document.addEventListener('DOMContentLoaded', () => {

    if (currCountry) {
        prepareCountryInfo(currCountry, document.querySelector('.country-info'));
    }

    window.onpopstate = (event) => {
        console.log(event);
    }

    function setSituationColors() {
        let elements = document.querySelectorAll('.footer li');

        let scores = countryData
            .sort((a, b) => a.score > b.score ? 1 : -1)
            .map(x => x.score);

        let max = Math.round(scores.slice(-1)[0] - scores[0]);
        let avarage = max / elements.length;

        elements.forEach((el, i) => {
            el.style.color = getColorByScore(i * avarage);
        });
    }

    setSituationColors();

    function renderCountryInfo(country) {
        return `
            <span class="country-info__ranking-number"># ${country.rank}</span>
            <h2 class="country-info__title">${country.name}</h2>
            <canvas id="doughnut-chart" width="800" height="450"></canvas>
            <p class="country-info__progression">${country.progression}</p>
            <p class="country-info__rank2015">${country.rank2015}</p>
            <p class="country-info__score2015">${country.score2015}</p>
        `;
    } 

    function prepareCountryInfo(country, infoDiv) {
        document.body.classList = 'country-info-visible';
        const currCountry = countryData.filter((x) => x.id === country.id)[0];
        window.history.pushState("object or string", "Title", "/" + currCountry.name.toLowerCase().replace(' ', '-'));
        document.getElementById(country.id).style.fill = getColorByScore(currCountry.score);
    
        infoDiv.innerHTML = renderCountryInfo(currCountry);
        renderPieChart(currCountry.score, getColorByScore(currCountry.score));
    }

    function openSection(e) {
        let target = e.target.closest('li').dataset.id;

        if (document.body.classList.contains('twitter-visible') && target != 'twitter') {
            document.body.classList = '';
            return setTimeout(() => document.body.classList = target + '-visible', 500);
        }
        
        if (document.body.classList == target + '-visible') {
            return document.body.classList = '';  
        }

        if (target === 'twitter') {
            document.body.classList = '';
            return setTimeout(() => document.body.classList = target + '-visible', 500);
        }

        document.body.classList = target + '-visible';
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

        document.querySelectorAll('.search-box__item')
            .forEach(x => x.addEventListener('click', (e) => {
                window.history.pushState({}, "", e.target.closest('li').innerText);
            }))

    }

    function getColorByScore(score) {
        return 'rgb(' + Math.round(score) * 4 + ', 150 , 100)';
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
        prepareCountryInfo(e.target, document.querySelector('.country-info'));
    }));

    const menuItems = document.querySelectorAll('.navigation__list-item'); 
    menuItems.forEach(item => item.addEventListener('click', openSection))

});
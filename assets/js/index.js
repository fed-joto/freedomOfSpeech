document.addEventListener('DOMContentLoaded', () => {

    const countryInfo = document.querySelector('.country-info');

    const renderCountryInfo = (e) => {
        document.body.classList = 'country-info-visible';
        const currCountry = x => x.id === e.target.id;
    
        countryInfo.innerHTML = countryData
            .filter(currCountry)
            .map(country => {
                window.history.pushState("object or string", "Title", "/" + country.name.toLowerCase());
                e.target.style.fill = getColorByScore(country.score);
                return `
                    <span class="country-info__ranking-number"># ${country.rank}</span>
                    <h2 class="country-info__title">${country.name}</h2>
                    <canvas id="doughnut-chart" width="800" height="450"></canvas>
                    <p class="country-info__progression">${country.progression}</p>
                    <p class="country-info__rank2015">${country.rank2015}</p>
                    <p class="country-info__score2015">${country.score2015}</p>
                `
            }).join('')

        renderPieChart(country.score, getColorByScore(country.score));
    }

    window.onpopstate = (event) => {
        console.log(event)
    }

    const initCountry = (cId) => {
        const currCountry = countryData.filter(x => x.id === cId)[0];
        var countryInfo = document.querySelector('.country-info');
        document.body.classList = 'country-info-visible';

        countryInfo.innerHTML = `
            <span class="country-info__ranking-number"># ${currCountry.rank}</span>
            <h2 class="country-info__title">${currCountry.name}</h2>
            <canvas id="doughnut-chart" width="800" height="450"></canvas>
            <p class="country-info__progression">${currCountry.progression}</p>
            <p class="country-info__rank2015">${currCountry.rank2015}</p>
            <p class="country-info__score2015">${currCountry.score2015}</p>
        `;
        renderPieChart(currCountry.score, getColorByScore(country.score));
    }

    if (currCountry) {
        initCountry(currCountry);
    }

    const mySvg = document.getElementById('mySvg');
    const allPaths = mySvg.querySelectorAll('path');
    allPaths.forEach(x => x.addEventListener('click', renderCountryInfo));

    const menuItems = document.querySelectorAll('.navigation__list-item')

    menuItems.forEach(item => item.addEventListener('click', openSection))

    function openSection(e) {
        let target = e.target.closest('li').dataset.id;
        
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
    const autocomplete = document.querySelector('.search-box__autocomplete');

    searchBox.addEventListener('keyup', searchResult);

    function searchResult() {

        allPaths.forEach(x => x.style.fill = '');

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
                window.history.pushState({}, "", e.target.closest('li').innerText)
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
            labels: ["Score", "Max är 100"],
            datasets: [{
                label: "Population (millions)",
                backgroundColor: [color, "#f3f3f3"],
                data: [score,100 - score]
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


})
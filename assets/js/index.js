document.addEventListener('DOMContentLoaded', () => {

    const countryInfo = document.querySelector('.country-info');

    const renderCountryInfo = (e) => {
        document.body.classList = 'country-info-visible';
        const currCountry = x => x.id === e.target.id;
    
        countryInfo.innerHTML = countryData
            .filter(currCountry)
            .map(country => {
                window.history.pushState("object or string", "Title", "/" + country.name.toLowerCase());
                const countryColor = 'rgb(' + Math.round(country.score) * 4 + ', 150 , 100)';
                e.target.style.fill = countryColor;
                return `
                    <span class="country-info__ranking-number"># ${country.rank}</span>
                    <h2 class="country-info__title">${country.name}</h2>
                    <canvas id="doughnut-chart" width="800" height="450"></canvas>
                    <p class="country-info__progression">${country.progression}</p>
                    <p class="country-info__rank2015">${country.rank2015}</p>
                    <p class="country-info__score2015">${country.score2015}</p>
                `
            }).join('')

        renderPieChart(country.score, '#550000');
    }

    window.onpopstate = (event) => {
        console.log(event)
    }

    const initCountry = (cId) => {
        const currCountry = countryData.filter(x => x.id === cId)[0];
        const countryColor = 'rgb(' + Math.round(currCountry.score) * 4 + ', 150 , 100)';
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
        renderPieChart(currCountry.score, countryColor);
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
        document.body.classList = target + '-visible';
    }

    // Search
    const searchBox = document.querySelector('.search-box input');
    const autocomplete = document.querySelector('.search-box__autocomplete');

    searchBox.addEventListener('keyup', searchResult);

    function searchResult() {
        const searchStr = searchBox.value.toLowerCase().trim();

        if (searchStr === '') return autocomplete.innerHTML = '';

        autocomplete.innerHTML = countryData
            // gör om:
            .filter(x => x.name.toLowerCase().includes(searchStr) || x.name.includes(searchStr))
            .sort((a, b) => a.name > b.name ? 1 : -1)
            .map(match => {
                // Dela matchning på söksträngen
                let subStr = match.name.toLowerCase().split(searchStr)
                // Om 
                if (subStr[0].length <= subStr[1].length) {
                    subStr = subStr[0] +  '<span>' + searchStr +  '</span>' + subStr[1];
                } else {
                    subStr = subStr[0] +  '<span>' + searchStr +  '</span>';
                }

                return `
                <li class="search-box__item">${subStr}</li>
            `}).join('');
        
        document.querySelectorAll('.search-box__item')
            .forEach(x => x.addEventListener('click', (e) => {
                window.history.pushState({}, "", e.target.closest('li').innerText)
            }))

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
$(document).ready(function() {

    var countryData = [];

    var handleClick = (e) => {
        console.log(typeof countryData);

        const currCountry = countryData.filter(x => x.id === e.target.id)[0];
        var countryInfo = document.querySelector('.country-info');
        countryInfo.classList.toggle('active');
        e.target.style.fill = 'rgb(' + Math.round(currCountry.score) * 4 + ', 150 , 100)';
        countryInfo.querySelector('h2').innerHTML = currCountry.name;
        countryInfo.querySelector('.country-info__ranking-number').innerHTML = '# ' + currCountry.rank;
        countryInfo.querySelector('.country-info__score').innerHTML = currCountry.score;
        countryInfo.querySelector('.country-info__progression').innerHTML = currCountry.progression;
        countryInfo.querySelector('.country-info__rank2015').innerHTML = currCountry.rank2015;
        countryInfo.querySelector('.country-info__score2015').innerHTML = currCountry.score2015;
    }

    var mySvg = document.getElementById('mySvg');
    var allPaths = mySvg.querySelectorAll('path');
    allPaths.forEach(x => x.addEventListener('click', handleClick));

    $.ajax('assets/data.json')
    .then(data => {
        countryData = JSON.parse(data);
    }); 


    const search = document.querySelector('.navigation__list-item--search')

    search.addEventListener('click', () => {
        document.body.classList.toggle('search-visible');
    })

   const action = document.querySelector('.navigation__list-item--action')

    action.addEventListener('click', () => {
        document.body.classList.toggle('action-visible');
    })

     const about = document.querySelector('.navigation__list-item--about')

    about.addEventListener('click', () => {
        document.body.classList.toggle('about-visible');
    })


    // Search
    const searchBox = document.querySelector('.search-box input');
    const autocomplete = document.querySelector('.search-box__autocomplete');

    searchBox.addEventListener('keyup', searchResult);

    function searchResult() {
        const searchStr = searchBox.value;
        autocomplete.innerHTML = countryData
            .filter(x => x.name.toLowerCase().includes(searchStr) || x.name.includes(searchStr))
            .sort((a, b) => a.name > b.name ? 1 : -1)
            .map(match => `
                <li class="search-box__item">${match.name}</li>
            `).join('')
    }


    
})
$(document).ready(function() {

    var handleClick = (e) => {
        const currCountry = countryData.filter(x => x.id === e.target.id)[0];
        const countryColor = 'rgb(' + Math.round(currCountry.score) * 4 + ', 150 , 100)';
        var countryInfo = document.querySelector('.country-info');
        countryInfo.classList.toggle('active');
        e.target.style.fill = countryColor;
        countryInfo.querySelector('h2').innerHTML = currCountry.name;
        countryInfo.querySelector('.country-info__ranking-number').innerHTML = '# ' + currCountry.rank;
        renderPieChart(currCountry.score, countryColor);
        countryInfo.querySelector('.country-info__progression').innerHTML = currCountry.progression;
        countryInfo.querySelector('.country-info__rank2015').innerHTML = currCountry.rank2015;
        countryInfo.querySelector('.country-info__score2015').innerHTML = currCountry.score2015;
    }

    var mySvg = document.getElementById('mySvg');
    var allPaths = mySvg.querySelectorAll('path');
    allPaths.forEach(x => x.addEventListener('click', handleClick));

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

    }


    // Pie Charts

    function renderPieChart(score, color) {
        new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: ["Score", "Max är 100"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: [color, "#f3f3f3"],
          data: [score,100 - score]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Score 2016'
      }
    }
})
    }


})
$(document).ready(function() {
    var a = document.getElementById("mySvg");

    var svgDoc = a.contentDocument;

    var allPaths = svgDoc.querySelectorAll('path');

    var handleClick = (e) => {

        $.ajax('assets/js/data.json')
        .then(data => {
            var countryInfo = document.querySelector('.country-info');
            countryInfo.classList.toggle('active');
            e.target.classList.toggle('active-country');
            countryInfo.querySelector('h2').innerHTML = data[0][e.target.id];
        });
    }

    allPaths.forEach(x => x.addEventListener('click', handleClick));
})
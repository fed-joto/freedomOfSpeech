const data = require('./data.json')
const countrycodes = require('./countrycodes.json')
const fs = require('fs');

const score = 'Underlying situation score 2016'
const progression = 'Progression RANK'
const rank2015 = 'Rank 2015'
const score2015 = 'Score 2015'

const myData = data.map(x => {
    let countryCode = countrycodes
        .filter(z => x.ISO === z['alpha-3'])
        .map(x => x['alpha-2'])

    return {
        "id": countryCode[0],
        "name": x.EN_country,
        "rank": x.Rank,
        "score": parseFloat(x[score].replace(',', '.')),
        "progression": x[progression],
        "score2015": parseFloat(x[score2015].replace(',', '.')),
        "rank2015": x[rank2015]
    }
})

fs.writeFile("./assets/test.json", JSON.stringify(myData, null, 2), (err) => {
    if (err) return console.log(err)
    console.log("The file was saved!")
})
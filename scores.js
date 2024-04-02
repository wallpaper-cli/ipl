const axios = require('axios')
const Constants = require('./constants')

const getUpdatedScores = async () => {
    return axios({
        method: 'get',
        url: Constants.webLink,
    })
        .then((data) => data.data)
        .then(data => JSON.parse(data.substring(17, data.length - 2)))
        .then(teamData => teamData.points.map(team=>({
            name: team.TeamCode,
            played: +team.Matches,
            won: +team.Wins,
            lost: +team.Loss,
            runrate: +team.NetRunRate,
            points: +team.Points
        })))
        .catch((error) => {
            console.log(error);
        });
}

module.exports = getUpdatedScores
const Xray = require('x-ray');
const Constants = require('./constants')

const getUpdatedScores = async () => {
    const x = Xray();
    const regex = /[A-Z]{2,4}$/g;
    let finalResponse = [];
    return new Promise((resolve, reject) => {
        x(Constants.webLink, '.standings-table tr', [{
            team: x('tr', ['td'])
        }])((err, content) => {
            if (err) {
                return reject(err);
            }
            finalResponse = content
                .filter((obj, index) => index !== 0)
                .map(({ team }) => {
                    return ({
                        name: team[1].match(regex)[0],
                        played: team[2],
                        won: team[3],
                        lost: team[4],
                        runrate: team[7],
                        points: team[10]
                    })
                })
            resolve(finalResponse)
        })
    })
}
module.exports = getUpdatedScores
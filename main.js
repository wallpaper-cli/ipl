const Jimp = require('jimp');
const axios = require('axios');
const { exec } = require('child_process');
const wallpaper = require('wallpaper');
const getScores = require('./scores')
const mocks = require('./mocks')

const fetchLogo = async (team) => {
    return axios({
        method: 'get',
        url: `https://scores.iplt20.com/ipl/teamlogos/${team.toUpperCase()}.png?v=2`,
        responseType: 'arraybuffer'
      })
      .catch(function(error) {
        console.log(error);
      });
}

const removeExistingFile = process.platform === 'win32'
    ? `del ${__dirname}/[0-9]*.png`
    : `rm -rf ${__dirname}/[0-9]*.png`;
const xList = [2000, 2100, 2500, 2635, 2760, 2860, 3100]
const file = `${new Date().getTime()}.png`;

const writeRowForEachTeam = async (image, font, x, y, teamInfo, listIndex) => {
    try {
        const logoResponse = await fetchLogo(teamInfo.name)
        const logo = await Jimp.read(logoResponse.data)
        image.composite(logo.resize(Jimp.AUTO, 80), x[0], y)
        image.print(font, 1883, y, (listIndex+1)+'.')
        Object.keys(teamInfo).map((eachColum, index) => {
            return image.print(font, x[index + 1], y, teamInfo[eachColum])
        })
    } catch (error) {
        Object.keys(teamInfo).map((eachColum, index) => {
            return image.print(font, x[index + 1], y, teamInfo[eachColum])
        })
    }
}

const createTableFromTemplate = async (teamDetails) => {
    const differenceBetweenRows = 143
    let image = await Jimp.read(`${__dirname}/Assets/Template/template.png`)
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE)
    const waitForImageToWrite = teamDetails.map(async (eachTeam, index) => {
        return writeRowForEachTeam(image, font, xList, 230 + differenceBetweenRows * index, eachTeam, index)
    })
    await Promise.all(waitForImageToWrite)
    // console.log('writing final file- ', file);
    image.write(`${__dirname}/${file}`, () => { })
}

(async () => {
    exec(removeExistingFile, (err) => {
        if (!err) {
            console.log("\x1b[33m", 'Fetching data from ipl servers');
        } else {
            console.log('Error: ', err);
        }
    });
    let list;
    try {
        list = await getScores()
    } catch (err) {
        console.error(err)
        list = mocks.list
    }
    // console.log(list);
    console.log("\x1b[33m", 'Updating your wallpaper');
    await createTableFromTemplate(list)
    await wallpaper.set(`${__dirname}/${file}`);
    console.log("\x1b[32m", 'Wallpaper updated successfully');
})();
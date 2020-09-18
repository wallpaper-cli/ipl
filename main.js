const Jimp = require('jimp');
const { exec } = require('child_process');
const wallpaper = require('wallpaper');
const getScores = require('./scores')
const mocks = require('./mocks')

const removeExistingFile = process.platform === 'win32'
    ? 'del *.png'
    : 'rm -rf [0-9]*.png';
const xList = [1950, 2100, 2480, 2620, 2750, 2860, 3100]
const file = `${new Date().getTime()}.png`;

const writeRowForEachTeam = async (image, font, x, y, teamInfo) => {
    try {
        const logo = await Jimp.read(`Assets/Logos/${teamInfo.name.toLowerCase()}.png`)
        image.composite(logo.resize(Jimp.AUTO, 80), x[0], y)
        Object.keys(teamInfo).map((eachColum, index) => {
            return image.print(font, x[index + 1], y, teamInfo[eachColum])
        })
    } catch (error) {
        // console.error(error)
        Object.keys(teamInfo).map((eachColum, index) => {
            return image.print(font, x[index + 1], y, teamInfo[eachColum])
        })
    }
}

const createTableFromTemplate = async (teamDetails) => {
    const differenceBetweenRows = 160
    let image = await Jimp.read('Assets/Template/template.png')
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE)
    const waitForImageToWrite = teamDetails.map(async (eachTeam, index) => {
        return await writeRowForEachTeam(image, font, xList, 475 + differenceBetweenRows * index, eachTeam)
    })
    await Promise.all(waitForImageToWrite)
    console.log('writing final file- ', file);
    image.write(file, () => { })
}

(async () => {
    exec(removeExistingFile, (err) => {
        if (!err) {
            console.log('File deleted');
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
    await createTableFromTemplate(list)
    await wallpaper.set(`./${file}`);
    console.log('Set ', file, ' as new wallpaper');
})();
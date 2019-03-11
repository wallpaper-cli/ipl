const Jimp = require('jimp');
const wallpaper = require('wallpaper');
const { list } = require('./mocks')

const xList = [1950, 2120, 2510, 2635, 2760, 2900, 3100]
const file = `${new Date().getTime()}.png`;

const writeRowForEachTeam = async (image, font, x, y, teamInfo) => {
    const logo = await Jimp.read(`./Assets/Logos/${teamInfo.name.toLowerCase()}.png`)
    image.composite(logo.resize(Jimp.AUTO, 80), x[0], y)
    Object.keys(teamInfo).map((eachColum, index) => {
        return image.print(font, x[index + 1], y, teamInfo[eachColum])
    })
}

const createTableFromTemplate = async (teamDetails) => {
    const differenceBetweenRows = 160
    let image = await Jimp.read('./Assets/Template/template.png')
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE)
    const waitForImageToWrite = teamDetails.map(async (eachTeam, index) => {
        return await writeRowForEachTeam(image, font, xList, 475 + differenceBetweenRows * index, eachTeam)
    })
    await Promise.all(waitForImageToWrite)
    console.log('writing final file- ', file);
    image.write(file, () => { })
}

(async () => {
    await createTableFromTemplate(list)
    await wallpaper.set(`./${file}`);
    console.log('set ', file, ' as new wallpaper');
})();
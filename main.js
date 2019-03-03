const Jimp = require('jimp');
const { list } = require('./mocks')

const xList = [1950, 2510, 2635, 2760, 2900, 3100]
const file = `${new Date().getTime()}.jpg`;

const writeRowForEachTeam = (image, font, x, y, teamInfo) => {
    Object.keys(teamInfo).map((eachColum, index) => {
        image.print(font, x[index], y, teamInfo[eachColum])
    })
}

const createTableFromTemplate = async (teamDetails) => {
    const differenceBetweenRows = 160
    const image = await Jimp.read('./Assets/Template/template.jpg')
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE)
    teamDetails.map(async (eachTeam, index) => {
        await writeRowForEachTeam(image, font, xList, 475 + differenceBetweenRows * index, eachTeam)
    })
    image.write(file, () => { })
}

createTableFromTemplate(list)

const {parse} = require('csv-parse');
const fs = require('fs');
const path = require('path');
const planets = require('./planets.mongo');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

// const promise = new Promise((resolve, reject) => {});
// primise.then(result)

 function loadPlanetsData () {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                   savePlanet(data);
                    // habitablePlanets.push(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err)
            })
            .on('end', async () => {
                const count = (await getAllPlanets()).length;
                console.log(`${count} habitable planets found!`);
                resolve();
            });
    })
}

async function getAllPlanets() {
    return await planets.find({}, {
        '_id': 0,
        '__v': 0});
}

async function savePlanet(planet) {
    try {
        await planets.findOneAndUpdate({
            keplerName: planet.kepler_name
        }, {
            keplerName: planet.kepler_name
        }, {
            upsert: true
        });
    } catch (error) {
        console.error(`Could not save planet ${error}`)
    }
}

module.exports = {
    loadPlanetsData,
    getAllPlanets
};
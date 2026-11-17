
import { parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';
import planets from './planets.mongo';

type KeplerRecord = Record<string, string>;

const habitablePlanets: KeplerRecord[] = [];

function isHabitablePlanet (planet: KeplerRecord): boolean {
    return planet['koi_disposition'] === 'CONFIRMED'
        && Number(planet['koi_insol']) > 0.36 && Number(planet['koi_insol']) < 1.11
        && Number(planet['koi_prad']) < 1.6;
}

function loadPlanetsData (): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data: KeplerRecord) => {
                if (isHabitablePlanet(data)) {
                    savePlanet(data);
                    habitablePlanets.push(data);
                }
            })
            .on('error', (err: Error) => {
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

async function getAllPlanets () {
    return await planets.find({}, {
        '_id': 0,
        '__v': 0
    });
}

async function savePlanet (planet: KeplerRecord) {
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

export {
    loadPlanetsData,
    getAllPlanets
};
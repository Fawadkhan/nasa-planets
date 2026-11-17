import launchesDatabase, { ILaunch } from './launches.mongo';
import planets from './planets.mongo';

// launches.set(launchesDatabase.flightNumber, launchesDatabase);
const DEFAULT_FLIGHT_NUMBER = 100;

export type NewLaunch = Pick<ILaunch, 'mission' | 'rocket' | 'launchDate' | 'target'>;

const launch: ILaunch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['NASA'],
    upcoming: true,
    success: true,
};

async function initializeLaunches() {
    await saveLaunches(launch);
  }

async function launchesHasId(flightNumber: number) {
    return await launchesDatabase.findOne({
        flightNumber
    });
}
 async function getAllLaunches() {
        return await launchesDatabase.find({}, {
            '_id': 0,
            '__v': 0
        });
}

async function saveLaunches(launch: ILaunch) {
    
    const planet = await planets.findOne(
        {
            keplerName: launch.target
        }
    )
    if(!planet) {
        throw new Error('No matching planet found')
    }

    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    });
}

async function getFlightNumber(): Promise<number> {
    const launch = await launchesDatabase.findOne({}).sort('-flightNumber');
    if(!launch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return launch.flightNumber;
}

async function addNewLaunch (launch: NewLaunch)  {
    const newFlightNumber = await getFlightNumber() + 1;

    const newLaunch: ILaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['NASA'],
        flightNumber: newFlightNumber
    });

    await saveLaunches(newLaunch);
    // await launchesDatabase.updateOne({
    //     flightNumber: latestFlightNumber
    // }, launch, {
    //     upsert: true
    // });
  
}

async function abortLaunch (flightNumber: number) {
    const abort = await launchesDatabase.updateOne({
        flightNumber
    }, {
        upcoming: false,
        success: false
    });

    return abort.modifiedCount === 1;

}

async function deleteLaunchFromDB (flightNumber: number) {
    const aborted = await launchesHasId(flightNumber);
    if (!aborted) {
        return false;
    }
    await launchesDatabase.deleteOne({
        flightNumber
    });
    return true;
}


export {
    initializeLaunches,
    addNewLaunch,
    getAllLaunches,
    saveLaunches,
    launchesHasId,
    abortLaunch,
    deleteLaunchFromDB
}

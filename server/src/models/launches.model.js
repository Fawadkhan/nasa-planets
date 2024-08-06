const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

// launches.set(launchesDatabase.flightNumber, launchesDatabase);
const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['NASA'],
    upcoming: true,
    success: true,
};

saveLaunches(launch);

async function launchesHasId(flightNumber) {
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

async function saveLaunches(launch) {
    
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

async function getFlightNumber() {
    const launch = await launchesDatabase.findOne({}).sort('-flightNumber');
    if(!launch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return launch.flightNumber;
}

async function addNewLaunch (launch)  {
    const newFlightNumber = await getFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
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

async function abortLaunch (flightNumber) {
    const abort = await launchesDatabase.updateOne({
        flightNumber
    }, {
        upcoming: false,
        success: false
    });

    return abort.modifiedCount === 1;

}

async function deleteLaunchFromDB (flightNumber) {
    const aborted = await launchesHasId(flightNumber);
    if (!aborted) {
        return false;
    }
    await launchesDatabase.deleteOne({
        flightNumber
    });
    return true;
}


module.exports = {

    addNewLaunch,
    getAllLaunches,
    saveLaunches,
    launchesHasId,
    abortLaunch,
    deleteLaunchFromDB
}

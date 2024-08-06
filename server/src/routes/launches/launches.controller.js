
const {launchesHasId, addNewLaunch, getAllLaunches, abortLaunch} = require('../../models/launches.model');


 const httpGetAllLaunches = async (req, res) => {
  return res.status(200).json(await getAllLaunches());
}

const postLaunch = async (req, res) => {
  const launch = req.body;
  if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: 'Missing required launch property'
    });
  }
  await addNewLaunch(launch);
  return res.status(200).json(launch);
}

const deleteLaunch = async(req, res) => {
  const flightNumber = req.params.id;
  const aborted = await launchesHasId(flightNumber);
  if(!aborted) {
    return res.status(404).json({
      error: 'Launch not found'
    });
  } 
    // await saveLaunches(aborted)
   const abortedLaunch =  await abortLaunch(flightNumber);
   if(!abortedLaunch) {
      return res.status(400).json({
        error: 'Launch not aborted'
      });
    } else {
      return res.status(200).json({
        ok: 'Launch aborted'
      });
    }
}


module.exports = {
    httpGetAllLaunches,
    // POST request to add a new launch
    postLaunch,
    // DELETE request to abort a launch
    deleteLaunch
}
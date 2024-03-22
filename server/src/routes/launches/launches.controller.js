
const {launches} = require('../../models/launches.model');

const getAllLaunches = (req, res) => {
  return res.status(200).json(Array.from(launches.values()));
}

const postLaunch = (req, res) => {
  const launch = req.body;
  launches.set(launch.flightNumber, launch);
  return res.status(200).json(launch);
}

const deleteLaunch = (req, res) => {
  const flightNumber = req.params.id;
  // console.log('launches ===>>', launches.get(flightNumber.toString()))
  console.log('typeOf', typeof flightNumber)
  // change type to number 
  const aborted = launches.get(Number(flightNumber));
  console.log("aborted ---->", aborted);
  aborted.upcoming = false;
  aborted.success = false;
  return res.status(200).json(Array.from(launches.values()));
}

module.exports = {
    getAllLaunches,
    // POST request to add a new launch
    postLaunch,
    // DELETE request to abort a launch
    deleteLaunch
}
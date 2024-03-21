
const {launches} = require('../../models/launches.model');

const getAllLaunches = (req, res) => {
  return res.status(200).json(Array.from(launches.values()));
}

const postLaunch = (req, res) => {
  const launch = req.body;
  launches.set(...launches, launch);
  return res.status(201).json(launch);
}

module.exports = {
    getAllLaunches,
    // POST request to add a new launch
    postLaunch
}
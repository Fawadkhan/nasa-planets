const express = require('express');
const { getAllLaunches, postLaunch } = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/launches', getAllLaunches);
launchesRouter.post('/launches', postLaunch );

module.exports = launchesRouter;
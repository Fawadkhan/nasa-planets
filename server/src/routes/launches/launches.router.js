const express = require('express');
const { getAllLaunches, postLaunch, deleteLaunch} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/launches', getAllLaunches);
launchesRouter.post('/launches', postLaunch );
launchesRouter.delete('/launches/:id', deleteLaunch);

module.exports = launchesRouter;
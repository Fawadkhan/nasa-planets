const express = require('express');
const { httpGetAllLaunches, postLaunch, deleteLaunch} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/launches', httpGetAllLaunches);
launchesRouter.post('/launches', postLaunch );
launchesRouter.delete('/launches/:id', deleteLaunch);

module.exports = launchesRouter;
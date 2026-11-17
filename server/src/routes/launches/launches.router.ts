import express from 'express';
import { httpGetAllLaunches, postLaunch, deleteLaunch } from './launches.controller';

const launchesRouter = express.Router();

launchesRouter.get('/launches', httpGetAllLaunches);
launchesRouter.post('/launches', postLaunch );
launchesRouter.delete('/launches/:id', deleteLaunch);

export default launchesRouter;
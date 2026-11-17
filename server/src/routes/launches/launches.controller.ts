import { Request, Response } from 'express';
import { launchesHasId, addNewLaunch, getAllLaunches, abortLaunch, NewLaunch } from '../../models/launches.model';

export const httpGetAllLaunches = async (_req: Request, res: Response) => {
  return res.status(200).json(await getAllLaunches());
}

// POST request to add a new launch
export const postLaunch = async (req: Request, res: Response) => {
  const launch: NewLaunch = req.body;
  if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: 'Missing required launch property'
    });
  }
  await addNewLaunch(launch);
  return res.status(200).json(launch);
}

// DELETE request to abort a launch
export const deleteLaunch = async (req: Request, res: Response) => {
  const flightNumber = Number(req.params.id);
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
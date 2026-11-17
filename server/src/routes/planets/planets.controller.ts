import { Request, Response } from 'express';
import { getAllPlanets } from '../../models/planets.model';

export const httpGetAllPlanets = async (_req: Request, res: Response) => {
  return res.status(200).json(await getAllPlanets());
}
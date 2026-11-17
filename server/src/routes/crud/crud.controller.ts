import { Request, Response } from 'express';
import { users } from '../../models/users.model';

export const getUser = (_req: Request, res: Response) => {
  return res.status(200).json(Array.from(users.values()));
}

export const getUserById = (req: Request, res: Response) => {
  const userId = req.params.id;
  return res.send(`User ${userId}`);
}
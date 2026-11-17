

import express from 'express';
import { getUser, getUserById } from './crud.controller';
const router = express.Router();

// Define routes
router.get('/users', getUser);

router.get('/users/:id', getUserById);

router.post('/users', (_req, res) => {
  res.send('Create a new user');
});

router.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Update user ${userId}`);
});

router.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Delete user ${userId}`);
});

export default router;
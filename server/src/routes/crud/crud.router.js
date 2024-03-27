const express = require('express');
const { getUser, getUserById } = require('./crud.controller');
const router = express.Router();

// Define routes
router.get('/users', getUser);

router.get('/users/:id', getUserById);

router.post('/users', (req, res) => {
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

module.exports = router;
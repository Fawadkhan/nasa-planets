const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');

const planetsRouter  = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');
const crudRouter = require('./routes/crud/crud.router');

const app = express();

// CORS middleware setup
app.use(cors({
    origin: 'https://nasa-planets-j83t.vercel.app'
}));

app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public' )));
app.use('/v1',api);
app.use(crudRouter);

// Handle all other routes by serving the index.html
app.get('/*', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
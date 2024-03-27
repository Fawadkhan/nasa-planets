const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const planetsRouter  = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');
const crudRouter = require('./routes/crud/crud.router');

const app = express();

// CORS middleware setup
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from this origin
}));

app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public' )));
app.use(planetsRouter);
app.use(launchesRouter);
app.use(crudRouter);

// Handle all other routes by serving the index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;

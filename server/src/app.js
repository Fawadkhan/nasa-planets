const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const api = require('./routes/api');

const planetsRouter  = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');
const crudRouter = require('./routes/crud/crud.router');

const app = express();

const allowedOrigins = [process.env.CORS_ORIGIN || '*'];
app.use(cors({
    origin: allowedOrigins,
}));

app.use(morgan('combined'));
app.use(express.json());

// API routes
app.use('/v1', api);
app.use('/v1/planets', planetsRouter);
app.use('/v1/launches', launchesRouter);
app.use('/v1/crud', crudRouter);

// 404 route for any unmatched API endpoint
app.use((_req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});


module.exports = app;
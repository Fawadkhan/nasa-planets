import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import api from './routes/api';

import planetsRouter from './routes/planets/planets.router';
import launchesRouter from './routes/launches/launches.router';
import crudRouter from './routes/crud/crud.router';

dotenv.config();

const app = express();

const allowedOrigins = ['*', "http://localhost:3000"];
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


export default app;
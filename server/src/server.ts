import app from './app';

import mongoConnect from './services/mongo';
import { loadPlanetsData } from './models/planets.model';
import { initializeLaunches } from './models/launches.model';

const PORT = process.env.PORT || 8000;

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await initializeLaunches();

  
  app.listen(PORT, () => {
    console.log(`========================= Server listening on port: ${PORT}=========================`);
  });
}

startServer();

export default app;





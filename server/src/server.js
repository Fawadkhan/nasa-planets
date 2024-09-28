const app = require('./app');

const mongoConnect = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  
  app.listen(PORT, () => {
    console.log(`========================= Server listening on port: ${PORT}=========================`);
  });
}

startServer();

module.exports = app; 
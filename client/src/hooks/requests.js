const API_URL = process.env.HOME_URL || 'http://localhost:8000';

// TODO: Once API is ready.
// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`)
  return await response.json();
}

async function httpGetLaunches() {
  const response = await (await fetch(`${API_URL}/launches`)).json()
  console.log("Response", response);
   response.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
  return response
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  const response = await fetch(`${API_URL}/launches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(launch),
  });

  return response.status;

}

async function httpAbortLaunch(id) {
  const response = await fetch(`${API_URL}/launches/${id}`, {
    method: 'DELETE',
  });
  return response.status;
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
import { useCallback, useEffect, useState } from "react";

import { httpGetPlanets } from "./requests";
import { Planet } from "../types";

function usePlanets() {
  const [planets, savePlanets] = useState<Planet[]>([]);

  const getPlanets = useCallback(async () => {
    const fetchedPlanets = await httpGetPlanets();
    savePlanets(fetchedPlanets);
  }, []);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return planets;
}

export default usePlanets;

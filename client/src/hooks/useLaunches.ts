import { FormEvent, useCallback, useEffect, useState } from "react";

import {
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
} from './requests';
import { Launch } from "../types";

function useLaunches(onSuccessSound: () => void, onAbortSound: () => void, onFailureSound: () => void) {
  const [launches, saveLaunches] = useState<Launch[]>([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);

  const getLaunches = useCallback(async () => {
    const fetchedLaunches = await httpGetLaunches();

    console.log("Launched fetched", fetchedLaunches);
    saveLaunches(fetchedLaunches);
  }, []);

  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  const submitLaunch = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPendingLaunch(true);
    const data = new FormData(e.target as HTMLFormElement);
    const launchDate = new Date(data.get("launch-day") as string);
    const mission = data.get("mission-name");
    const rocket = data.get("rocket-name");
    const target = data.get("planets-selector");
    const upcoming = true;
    const response = await httpSubmitLaunch({
      flightNumber: Math.floor(Math.random() * 1000),
      cusomters: ["FAWAD"],
      launchDate,
      upcoming,
      success: true,
      mission,
      rocket,
      target,
    });
    
    let success = false;
    if(response === 201 || response === 200) {
      success = true
    }
    if (success) {
      console.log("Success");
      getLaunches();
      setTimeout(() => {
        setPendingLaunch(false);
        onSuccessSound();
      }, 800);
    } else {
      onFailureSound();
    }
  }, [getLaunches, onSuccessSound, onFailureSound]);

  const abortLaunch = useCallback(async (id: number) => {
    const response = await httpAbortLaunch(id);

    if(response === 200) {
      getLaunches();
      onAbortSound();
    }
    else {
      onFailureSound();
    }
    const success = false;
    if (success) {
      getLaunches();
      onAbortSound();
    } else {
      onFailureSound();
    }
  }, [getLaunches, onAbortSound, onFailureSound]);

  return {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  };
}

export default useLaunches;
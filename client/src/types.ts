export interface Planet {
  keplerName: string;
}

export interface Launch {
  flightNumber: number;
  launchDate: string | Date;
  mission: string;
  rocket: string;
  target?: string;
  customers?: string[];
  upcoming: boolean | null;
  success: boolean;
}

export type SoundPlayer = { play: () => void };
export type Sounds = Record<string, SoundPlayer | undefined>;
export type Classes = Record<string, string>;

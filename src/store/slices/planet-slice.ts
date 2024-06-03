import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export enum Planets {
  earth = 'earth',
  venus = 'venus',
  mars = 'mars'
}

// enum PlanetsColor {
//   venus = 'rgb(255,219,75)',
//   earth = 'rgb(31, 163, 240)',
//   mars = 'rgb(197,42,9)'
// }

enum VenusColors {
  Light = 'rgb(255,219,75)',
  Dark = 'rgb(145 124 39)'
}

enum EarthColors {
  Light = 'rgb(36 174 255)',
  Dark = 'rgb(23 90 130)'
}

enum MarsColors {
  Light = 'rgb(237 52 12)',
  Dark = 'rgb(140 33 9)'
}

const PlanetsColor = {
  venus: VenusColors,
  earth: EarthColors,
  mars: MarsColors
};

export interface PlanetSliceState {
  planet: Planets;
  accentColor: typeof VenusColors | typeof EarthColors | typeof MarsColors;
}
export const defaultPlanet: Planets = Planets.earth;
const savedPlanet = localStorage.getItem('sloth-selectedPlanet') as Planets | null;

const initialState: PlanetSliceState = {
  planet: savedPlanet ?? defaultPlanet,
  accentColor: savedPlanet ? PlanetsColor[savedPlanet] : PlanetsColor[defaultPlanet]
};

export const planetSlice = createSlice({
  name: 'planet_slice',
  initialState,
  reducers: {
    setPlanet(state, action: PayloadAction<Planets>) {
      state.planet = action.payload;
      state.accentColor = PlanetsColor[action.payload];
      localStorage.setItem('sloth-selectedPlanet', action.payload);
    }
  }
});

export const setPlanet = planetSlice.actions.setPlanet;

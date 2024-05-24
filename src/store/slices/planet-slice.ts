import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export enum Planets {
  earth = 'earth',
  venus = 'venus',
  mars = 'mars'
}
enum PlanetsColor {
  earth = 'rgb(79,166,217)',
  mars = 'rgb(183,44,20)',
  venus = 'rgb(246,212,146)'
}
export interface planetSliceState {
  planet: Planets;
  accentColor: PlanetsColor;
}

const initialState: planetSliceState = {
  planet: Planets.earth,
  accentColor: PlanetsColor.earth
};
export const planetSlice = createSlice({
  name: 'planet_slice',
  initialState,
  reducers: {
    choosePlanet(state, action: PayloadAction<Planets>) {
      state.planet = action.payload;
      state.accentColor = PlanetsColor[action.payload];
    }
  }
});

export const choosePlanet = planetSlice.actions.choosePlanet;

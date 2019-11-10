export const models = {
  season: {
    name: undefined,
    plants: [],
  },
  plant: {
    name: undefined,
    plantDate: new Date(),
    harvestDate: undefined,
    entries: [],
  },
  entry: {
    name: undefined,
    temperature: {
      f:undefined,
      c:undefined,
    },
    visibility: undefined,
    dawn: undefined,
    dusk: undefined,
    precipitation: undefined,
    health: 0,
    water: false,
    notes: 'Enter Field Notes Here',
  },
  user: {
    temp: 'c'
  },
  defaultStore: {
    seasons: [],
    selectedSeason: undefined,
    selectedPlant: undefined,
    selectedEntry: undefined,
    user: {
      temp: 'c',
    }
  }
}


export const placeholders = {
  season: "Enter Season Name",
  plant: "Enter Plant Name",
  entry: "Enter Entry Date",
}
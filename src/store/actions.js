import {getState, setState} from "./state";

function updateArrays(before = [], target = [], after = []){
  return [].concat(before, target, after);
}

function updateObject(original = {}, update = {}){
  return Object.assign({}, original, update)
}

function splitSegments(array, index){
  return [
    array.slice(0, index),
    array.slice(index + 1)
  ]
}

export function updateElement(positions, property){
  const store = getState();
  let season;
  let plant;
  let entry;
  if(typeof positions.season !== 'undefined'){
    season = store.seasons[positions.season] || {};
  }
  if(typeof positions.plant !== 'undefined'){
    plant = season.plants[positions.plant] || {};
  }
  if(typeof positions.entry !== 'undefined'){
    entry = plant.entries[positions.entry] || {};
  }

  let target = property;

  if(entry){
    const update = updateObject(entry, target);
    const segments = splitSegments(plant.entries, positions.entry);
    target = {
      entries: updateArrays(segments[0], update, segments[1])
    }
  }
  if(plant){
    const update = updateObject(plant, target);
    const segments = splitSegments(season.plants, positions.plant);
    target = {
      plants: updateArrays(segments[0], update, segments[1])
    }
  }
  if(season){
    const update = updateObject(season, target);
    const segments = splitSegments(store.seasons, positions.season);
    target = {
      seasons: updateArrays(segments[0], update, segments[1])
    }
  }

  setState(updateObject(store, target));
  /*const update = Object.assign(
    {},
    store,
    season ? {
          seasons: [].concat(
              store.seasons.slice(0,positions.season),
              plant ?
                Object.assign(
                  {},
                  season,
                  { plants: [].concat(
                      season.plants.slice(0,positions.plant),
                      entry ?
                        Object.assign(
                          {},
                          plant,
                          { entries: [].concat(
                              plant.entries.slice(0,positions.entry),
                              Object.assign({}, entry, property),
                              plant.entries.slice(positions.entry + 1)
                            )}
                        ) :
                        Object.assign({}, plant, property),
                      season.plants.slice(positions.plant + 1),
                    )}
                ) :
                Object.assign({}, season, property),
              store.seasons.slice(positions.season + 1))
        } :
        undefined)
  console.log(update);
  setState(update);*/
}

export function addElement(positions, property){
  const store = getState();
  let season;
  let plant;
  if(typeof positions.season !== 'undefined'){
    season = store.seasons[positions.season] || {};
  }
  if(typeof positions.plant !== 'undefined'){
    plant = season.plants[positions.plant] || {};
  }

  //I dont like this...
  const update = Object.assign(
    {},
    store,
    season ? {
          seasons: [].concat(
              store.seasons.slice(0,positions.season),
              plant ?
                Object.assign(
                  {},
                  season,
                  { plants: [].concat(
                      season.plants.slice(0,positions.plant),
                      {...plant, entries: [].concat(plant.entries, property || [])},
                      season.plants.slice(positions.plant + 1),
                    )}
                ) :
                {...season, plants:[].concat(season.plants, property)},
              store.seasons.slice(positions.season + 1))
        } :
        {
          seasons: [].concat(store.seasons, property || [])
        }
  )
  setState(update);
}

export function removeElement(positions){
  const store = getState();
  let season;
  let plant;
  let entry;
  if(typeof positions.season !== 'undefined'){
    try{
      season = store.seasons[positions.season] || {};
    } catch(err){
      throw new Error('Something went wrong gathering season from store')
    }
  }
  if(typeof positions.plant !== 'undefined'){
    try {
      plant = season.plants[positions.plant] || {};
    } catch(err){
      throw new Error('Something went wrong gathering plants from season')
    }
  }
  if(typeof positions.entry !== 'undefined'){
    try {
      entry = plant.entries[positions.entry] || {};
    } catch(err){
      throw new Error('something went wrong gathering entries from plants')
    }
  }

  //I dont like this...
  const update = Object.assign(
    {},
    store,
    season ? {
          seasons: [].concat(
              store.seasons.slice(0,positions.season),
              plant ?
                Object.assign(
                  {},
                  season,
                  { plants: [].concat(
                      season.plants.slice(0,positions.plant),
                      entry ?
                        Object.assign(
                          {},
                          plant,
                          {
                            entries: [].concat(
                              plant.entries.slice(0, positions.entry),
                              [],
                              plant.entries.slice(positions.entry + 1))
                          }
                        )
                      :
                        [],
                      season.plants.slice(positions.plant + 1),
                    )}
                ) :
                [],
              store.seasons.slice(positions.season + 1))
        } :
        undefined
  )
  setState(update);
}

export function updateUserProperty(position, property){
  const store = getState();

  const update = Object.assign(
    {},
    store,
    property
  )
}
/*export const getSeasons = function(){
  return getState().seasons;
}

export const getSeason = function(index){
  return getState().seasons[index]
}

export const getPlant = function(seasonIndex, plantIndex){
  return getState().seasons[seasonIndex].plants[plantIndex]
}

export const getEntry = function(seasonIndex, plantIndex, entryIndex){
  return getState().seasons[seasonIndex].plants[plantIndex].entries[entryIndex]
}

export const addSeason = function(season){
  const store = getState();
  store.seasons.push(season);
  setState(store);
}

export const editSeason = function(index, newSeason){
  const store = getState();
  const front = store.seasons.slice(0,index);
  const back = store.seasons.slice(index+1);
  store.seasons = [].concat(front, [ newSeasons ], back)
  setState(store);
}

export const addPlant = function(seasonIndex, plant){
  const store = getState();
  store.seasons[seasonIndex].plants.push(plant);
  setState(store);
}

export const editPlant = function(seasonIndex, plantIndex, newPlant){
  const store = getState();
  const front = store.seasons[seasonIndex].plants.slice(0, plantIndex);
  const back = store.seasons[seasonIndex].plants.slice(plantIndex + 1);
  store.seasons[season.index].plants = [].concat(front, [ newPlant ], back);
  setState(store);
}

export const addEntry = function(seasonIndex, plantIndex, entry){
  const store = getState();
  store.seasons[seasonIndex].plants[plantIndex].entries.push(entry);
  setState(store);
}

export const editEntry = function(seasonIndex, plantIndex, entryIndex, newEntry){
  const store = getState();
  const front = store.seasons[seasonIndex].plants[plantIndex].enteries.slice(0, entryIndex);
  const back = store.seasons[seasonIndex].plants[plantIndex].entries.slice(entryIndex + 1);
  store.seasons[seasonIndex].plants[plantIndex].entries = [].concat(front, [ newEntry ], back)
  setState(store);
}*/
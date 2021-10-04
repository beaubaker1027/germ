import * as F from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import {
    Plants,
    appendNewPlant,
    fromJson,
    empty,
    replacePlant,
    deletePlant
} from '../lib/plant';
import {
    storeString,
    get,
    store,
    mkGet,
    mkModify
} from './storage';

const plantStorage:Readonly<string> = 'PLANTS';

const emptyPlantsE = F.constant(E.of(empty()) as E.Right<Plants>);

const storePlants = store(plantStorage);

export const getPlants = mkGet(get(plantStorage))(emptyPlantsE)(fromJson);
export const addPlant = mkModify(getPlants)(appendNewPlant)(storeString(storePlants));
export const updatePlant = mkModify(getPlants)(replacePlant)(storeString(storePlants));
export const removePlant = mkModify(getPlants)(deletePlant)(storeString(storePlants));
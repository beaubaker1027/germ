import * as F from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import {
    mkGetPlants,
    mkAddPlant,
    mkUpdatePlant,
    mkRemovePlant
} from '../../lib/plant';
import {
    storeString
} from '../../lib/storage';
import { getItem, setItem } from 'fp-ts-local-storage';

const plantStorage:Readonly<string> = 'PLANTS';

const storePlant = storeString((val) => setItem(plantStorage, val))

export const getPlants = 
    mkGetPlants(getItem(plantStorage));

export const addPlant = 
    mkAddPlant(getPlants)
              (storePlant);

export const updatePlant = 
    mkUpdatePlant(getPlants)
                 (storePlant);

export const removePlant = 
    mkRemovePlant(getPlants)
                 (storePlant);
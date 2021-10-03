import * as F from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import {
    Plants,
    fromJson,
    appendNewPlant,
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

export const getJournals = mkGet(get(plantStorage))(emptyPlantsE)(fromJson);
export const addJournal = mkModify(getJournals)(appendNewPlant)(storeString(storePlants));
export const updateJournal = mkModify(getJournals)(replacePlant)(storeString(storePlants));
export const removeJournal = mkModify(getJournals)(deletePlant)(storeString(storePlants));
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

const journalStorage:Readonly<string> = 'Journals';

const emptyJournalsE = F.constant(E.of(empty()) as E.Right<Plants>);

const storeJournals = store(journalStorage);

export const getJournals = mkGet(get(journalStorage))(emptyJournalsE)(fromJson);
export const addJournal = mkModify(getJournals)(appendNewPlant)(storeString(storeJournals));
export const updateJournal = mkModify(getJournals)(replacePlant)(storeString(storeJournals));
export const removeJournal = mkModify(getJournals)(deletePlant)(storeString(storeJournals));
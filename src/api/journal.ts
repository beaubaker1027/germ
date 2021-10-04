import * as F from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import {
    Journals,
    fromJson,
    appendNewJournal,
    empty,
    replaceJournal,
    deleteJournal
} from '../lib/journal';
import {
    storeString,
    get,
    store,
    mkGet,
    mkModify
} from './storage';

const journalStorage:Readonly<string> = 'Journals';

const emptyJournalsE = F.constant(E.of(empty()) as E.Right<Journals>);

const storeJournals = store(journalStorage);

export const getJournals = mkGet(get(journalStorage))(emptyJournalsE)(fromJson);
export const addJournal = mkModify(getJournals)(appendNewJournal)(storeString(storeJournals));
export const updateJournal = mkModify(getJournals)(replaceJournal)(storeString(storeJournals));
export const removeJournal = mkModify(getJournals)(deleteJournal)(storeString(storeJournals));
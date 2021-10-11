import * as F from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import {
    mkGetJournals,
    mkAddJournal,
    mkUpdateJournal,
    mkRemoveJournal
} from '../../lib/journal';
import {
    storeString
} from '../../lib/storage';
import { getItem, setItem } from 'fp-ts-local-storage';

const journalStorage:Readonly<string> = 'Journals';

const storeJournal = storeString((val) => setItem(val, journalStorage))

export const getJournals = mkGetJournals(getItem(journalStorage));
export const addJournal = mkAddJournal(getJournals)(storeJournal);
export const updateJournal = mkUpdateJournal(getJournals)(storeJournal);
export const removeJournal = mkRemoveJournal(getJournals)(storeJournal);
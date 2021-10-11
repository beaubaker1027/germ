import * as F from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import * as P from 'fp-ts/Predicate';
import { stringify, parse } from 'fp-ts/Json';
import { v4 as uuid } from 'uuid';
import { DBEntity, hasId, Uuid } from "./db";
import { mkGet, mkModify } from './storage';

export interface Journal {
    readonly date: DateTime;
    readonly note: Note;
}

export type DBJournal = Journal & DBEntity;

export type Journals = DBJournal[];

type DateTime = Number;
type Note = String;

interface empty {
    (): Journals;
}
export const empty:empty = A.zero;

interface fromJson {
    (val:string): E.Either<Error, Journals>
}
export const fromJson:fromJson = (val) => parse(val) as E.Either<Error, Journals>;

interface toJson {
    (journals: Journals): E.Either<unknown, string>;
}
export const toJson:toJson = (journals) => stringify(journals);

interface of {
    (journal: Journal): DBJournal
}
export const of:of = ( journal ) => Object.assign({
    id: uuid(),
    ...journal
});

interface findById {
    (id: Uuid): (journals: Journals) => O.Option<DBJournal>
}
export const findById:findById = ( id ) => ( journals ) => 
    A.findFirst(hasId(id))(journals);

interface appendNewJournal {
    (journal: Journal): (journals:Journals) => Journals;
}
export const appendNewJournal:appendNewJournal = journal => journals => A.append(of(journal))(journals);

interface replaceJournal {
    (journal: DBJournal): (journals: Journals) => Journals
}
export const replaceJournal:replaceJournal = journal => 
    A.map( (p) => findById(journal.id) ? journal : p);

interface deleteJournal {
    (id:Uuid): (journals:Journals) => Journals;
}
export const deleteJournal:deleteJournal = id => journals => A.filter(P.not(hasId(id)))(journals);

export const journalStorage:Readonly<string> = 'Journals';

const emptyJournalsE = () => (F.pipe(empty, E.of) as unknown as E.Right<Journals>);

export const mkGetJournals = mkGet(emptyJournalsE)(fromJson);
export const mkAddJournal = mkModify(appendNewJournal);
export const mkUpdateJournal = mkModify(replaceJournal);
export const mkRemoveJournal = mkModify(deleteJournal);
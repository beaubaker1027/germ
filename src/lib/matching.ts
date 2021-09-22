import * as A from 'fp-ts/Array';
import * as F from 'fp-ts/function';
import * as R from 'fp-ts/Record';
import * as O from 'fp-ts/Option';

interface match {
    <P extends Matchable, B extends any>(patterns: P, d: B): (value: Key) => B;
}

export interface Matchable {
    [key: string]: any;
}

type Key = string

export const match:match = ( patterns, d ) => F.flow(
    (val) => R.lookup(val)(patterns),
    O.getOrElse(F.constant(d))
);
    

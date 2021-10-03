import * as O from 'fp-ts/Option';
import * as R from 'fp-ts/Record';
import * as F from 'fp-ts/function';

export type Keys<O> = keyof O;
export type Values<O> = O[keyof O]; 

interface mkHasValueInKey {
    (key:string): <V>(val: V) => <O extends Record<Keys<O>, Values<O>>>(obj: O) => boolean
}
export const mkHasValueInKey:mkHasValueInKey = (key) => (id) => (obj) => F.pipe(
    R.lookup(key)(obj),
    O.fold(
        F.constant(false),
        val => val === id
    )
);
import * as F from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as IO from 'fp-ts/IO';
import * as E from 'fp-ts/Either';
import { stringify } from 'fp-ts/Json';
import { getItem, setItem } from 'fp-ts-local-storage';

type getItems = ReturnType<typeof getItem>;

interface mkGet {
    (getItems:getItems): <L>(onNone:() => L) => 
        <R>(onSome: (val:string) => R) => 
            IO.IO<L | R>;
}
export const mkGet:mkGet = getItems => onNone => onSome => F.pipe(
    getItems,
    IO.map(
        O.foldW(
            onNone,
            onSome,
        )
    )
);

interface get {
    (key:string): getItems;
}
export const get:get = key => getItem(key);

interface store {
    (key:string): (value: string) => IO.IO<void>
}
export const store:store = key => value => setItem(key, value);

interface storeString {
    (store: (val:string) => IO.IO<void>): <V>(obj:V) => E.Either<unknown, true>
}
export const storeString:storeString = store => F.flow(
    stringify,
    E.map(store),
    E.map<IO.IO<void>, true>(_ => true)
);

interface mkModify {
    <E,G>(get:IO.IO<E.Either<E, G>>): 
        <V>(modify: (i:V) => (a:G) => G ) => 
                <E1>(set:(a: G) => E.Either<E | E1, true>) => 
                    (val: V) => 
                        IO.IO<E.Either<unknown, true>>
}
export const mkModify:mkModify = get => modify => set => (item) => F.pipe(
    get,
    IO.map(
        E.chainW(
            F.flow(
                modify(item),
                set
            )
        )
    )
);
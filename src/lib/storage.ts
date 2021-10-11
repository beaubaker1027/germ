import * as F from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as IO from 'fp-ts/IO';
import * as E from 'fp-ts/Either';
import { stringify } from 'fp-ts/Json';

type getItems = IO.IO<O.Option<string>>;
type setItems = IO.IO<void>;

interface mkGet {
    <L>(onNone:() => L): 
        <R>(onSome: (val:string) => R) => 
            (getItems:getItems) =>
                IO.IO<L | R>;
}
export const mkGet:mkGet = onNone => onSome => getItems => F.pipe(
    getItems,
    IO.map(
        O.foldW(
            onNone,
            onSome,
        )
    )
);

interface storeString {
    (store: (val:string) => setItems): <V>(obj:V) => E.Either<unknown, true>
}
export const storeString:storeString = store => F.flow(
    stringify,
    E.map(store),
    E.map<setItems, true>(
        setItems => {
            setItems();
            return true;
        }
    )

);

interface mkModify {
    <V, G>(modify: (i:V) => (a:G) => G ):
        <E>(get:IO.IO<E.Either<E, G>>) =>
            <E1>(set:(a: G) => E.Either<E | E1, true>) => 
                (val: V) => 
                    IO.IO<E.Either<unknown, true>>
}
export const mkModify:mkModify = modify => get => set => (item) => F.pipe(
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
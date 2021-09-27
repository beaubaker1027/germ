import * as F from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as IO from 'fp-ts/IO';
import * as E from 'fp-ts/Either';
import { stringify } from 'fp-ts/Json';
import { getItem, setItem } from 'fp-ts-local-storage';
import {
    Plants,
    fromJson,
    appendNewPlant,
    empty,
    replacePlant,
    deletePlant
} from '../lib/plant';

type getItems = ReturnType<typeof getItem>;

const plantStorage:Readonly<string> = 'PLANTS';

const emptyPlantsE = F.constant(E.of(empty()) as E.Right<Plants>);

interface mkGet {
    (getItems:getItems): <L>(onNone:() => L) => 
        <R>(onSome: (val:string) => R) => 
            IO.IO<L | R>;
}
const mkGet:mkGet = getItems => onNone => onSome => F.pipe(
    getItems,
    IO.map(
        O.foldW(
            onNone,
            onSome,
        )
    )
);

export const getPlants = 
    mkGet(getItem(plantStorage))(emptyPlantsE)(fromJson);

interface store {
    (key:string): (value: string) => IO.IO<void>
}
const store:store = key => value => setItem(key, value);

const storePlants = store(plantStorage);

const storeString = F.flow(
    stringify,
    E.map(storePlants),
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

export const addPlant = mkModify(getPlants)(appendNewPlant)(storeString);
export const updatePlant = mkModify(getPlants)(replacePlant)(storeString);
export const removePlant = mkModify(getPlants)(deletePlant)(storeString);
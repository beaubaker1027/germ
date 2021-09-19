import { pipe, flow, constant } from 'fp-ts/function';
import * as T from 'fp-ts/Task';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import * as IO from 'fp-ts/IO';
import * as E from 'fp-ts/Either';
import * as P from 'fp-ts/Predicate';
import * as R from 'fp-ts/Record';
import { stringify, parse, Json } from 'fp-ts/Json';
import { getItem, setItem, removeItem } from 'fp-ts-local-storage';
import { v4 as uuid } from 'uuid';

export interface Plant {
    readonly id: Uuid;
    readonly name: Name;
    readonly tags: Tag[];
};

type Uuid = string;
type Name = string;
type Tag = string;

const plantStorage:Readonly<string> = 'PLANTS';

interface empty {
    (): Plant[]
}

const empty:empty = constant([]);

interface hasId {
    (id: Uuid): (plant: Plant) => boolean
}

const hasId:hasId = (id) => (plant) => pipe(
                    // is there a way to define this better ↓
    R.lookup('id')(plant as unknown as Record<string, Uuid | Name | Tag[]>),
    O.fold(
        constant(false),
        val => val === id
    )
);

interface fromJson {
    (json: Json): Plant[]
}

const fromJson:fromJson = (json) => json as unknown as Plant[];

interface of {
    (plant: Omit<Plant, 'id'>): Plant
}

export const of:of = ( plant) => Object.assign({
    id: uuid(),
    ...plant
});

interface findById {
    (id: Uuid): (plants: Plant[]) => O.Option<Plant>
}

export const findById:findById = ( id ) => ( plants ) => 
    A.findFirst(hasId(id))(plants);

interface replacePlant {
    (plant: Plant): (plant: Plant[]) => Plant[]
}

const replacePlant:replacePlant = ( plant: Plant ) => 
    A.map( (p:Plant) => findById(plant.id) ? plant : p);

interface getPlants {
    (): E.Either<unknown, Plant[]>
}

export const getPlants:getPlants = pipe(
    getItem(plantStorage),
    IO.map(
        O.foldW(
            constant(E.of<unknown, Plant[]>(empty())),
            flow(
                parse,
                E.chain((json) => E.right(fromJson(json)))
            )
        )
    )
);

interface storePlants {
    (value: string): IO.IO<void>
}

const storePlants:storePlants = (value) => setItem(plantStorage, value);

interface storeString {
    (val: Plant[]): E.Either<unknown, IO.IO<void>>
}

const storeString: storeString = flow(
    stringify,
    E.chain( val => E.of(storePlants(val)))
);

interface addPlant {
    (plant: Omit<Plant, 'id'>): IO.IO<E.Either<unknown, true>>
}

export const addPlant:addPlant = (plant) => pipe(
    getPlants,
    IO.map(
        E.chain(
            flow(
                A.append(of(plant)),
                storeString,
                E.chain(_ => E.right(true))
            )
        )
    )
);

interface updatePlant {
    (plant: Plant): IO.IO<E.Either<unknown, true>>
}

export const updatePlant:updatePlant = (plant) => pipe(
    getPlants,
    IO.map(
        E.chain(
            flow(
                replacePlant(plant),
                storeString,
                E.chain(_ => E.right(true))
            )
        )
    )
);

interface removePlant {
    (id: Uuid): IO.IO<E.Either<unknown, IO.IO<void>>>
}

export const removePlant:removePlant = (id) => pipe(
    getPlants,
    IO.map(
        E.chain(
            flow(
                A.filter(P.not(hasId(id))),
                storeString
            )
        )
    )
);

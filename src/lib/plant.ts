import * as F from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import * as P from 'fp-ts/Predicate';
import * as R from 'fp-ts/Record';
import { stringify, parse } from 'fp-ts/Json';
import { v4 as uuid } from 'uuid';

export interface Plant {
    readonly id: Uuid;
    readonly name: Name;
    readonly tags: Tag[];
};

export type Plants = Plant[];

export type Uuid = string;
export type Name = string;
export type Tag = string;

interface empty {
    (): Plants
}
export const empty:empty = A.zero;

interface hasId {
    (id: Uuid): (plant: Plant) => boolean
}
export const hasId:hasId = (id) => (plant) => F.pipe(
                    // is there a way to define this better ↓
    R.lookup('id')(plant as unknown as Record<string, Uuid | Name | Tag[]>),
    O.fold(
        F.constant(false),
        val => val === id
    )
);

interface fromJson {
    (val:string): E.Either<Error, Plants>
}
export const fromJson:fromJson = (val) => parse(val) as E.Either<Error, Plants>;

interface toJson {
    (plants: Plants): E.Either<unknown, string>;
}
export const toJson:toJson = (plants) => stringify(plants);

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

interface appendNewPlant {
    (plant: Omit<Plant, 'id'>): (plants:Plants) => Plants;
}
export const appendNewPlant:appendNewPlant = plant => plants => A.append(of(plant))(plants);

interface replacePlant {
    (plant: Plant): (plant: Plants) => Plants
}
export const replacePlant:replacePlant = ( plant: Plant ) => 
    A.map( (p:Plant) => findById(plant.id) ? plant : p);

interface deletePlant {
    (id:Uuid): (plants:Plants) => Plants;
}
export const deletePlant:deletePlant = id => plants => A.filter(P.not(hasId(id)))(plants);
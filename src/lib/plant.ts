import * as F from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import * as P from 'fp-ts/Predicate';
import * as R from 'fp-ts/Record';
import { stringify, parse } from 'fp-ts/Json';
import { v4 as uuid } from 'uuid';
import { mkHasValueInKey } from './record';

/**
 * name
 * tags
 * description
 * care instructions
 * sun requirements
 * soil requirements
 */
export interface Plant {
    readonly name: Name;
    readonly description: Description;
    readonly careRequirement: CareRequirement;
    readonly sunRequirement: SunRequirement;
    readonly soilRequirement: SoilRequirement;
    readonly status: Status;
    readonly tags: Tag[];
}

export interface DBPlant extends Plant {
    readonly id: Uuid;
}

export type Plants = DBPlant[];

export type Uuid = string;
export type Name = string;
export type Description = string;
export type CareRequirement = string;
export type SunRequirement = string;
export type SoilRequirement = string;
export type Status = 
      'Seed'
    | 'Sprout'
    | 'Seedling'
    | 'Vegetative'
    | 'Budding'
    | 'Flowering'
    | 'Ripening'
    | 'Dead/Dormant/Harvested';
export type Tag = string;

interface empty {
    (): Plants
}
export const empty:empty = A.zero;

export const hasId = mkHasValueInKey('id');

interface fromJson {
    (val:string): E.Either<Error, Plants>
}
export const fromJson:fromJson = (val) => parse(val) as E.Either<Error, Plants>;

interface toJson {
    (plants: Plants): E.Either<unknown, string>;
}
export const toJson:toJson = (plants) => stringify(plants);

interface of {
    (plant: Plant): DBPlant
}
export const of:of = ( plant) => Object.assign({
    id: uuid(),
    ...plant
});

interface findById {
    (id: Uuid): (plants: Plants) => O.Option<Plant>
}
export const findById:findById = ( id ) => ( plants ) => 
    A.findFirst(hasId(id))(plants);

interface appendNewPlant {
    (plant: Plant): (plants:Plants) => Plants;
}
export const appendNewPlant:appendNewPlant = plant => plants => A.append(of(plant))(plants);

interface replacePlant {
    (plant: DBPlant): (plant: Plants) => Plants
}
export const replacePlant:replacePlant = plant => 
    A.map( (p) => findById(plant.id) ? plant : p);

interface deletePlant {
    (id:Uuid): (plants:Plants) => Plants;
}
export const deletePlant:deletePlant = id => plants => A.filter(P.not(hasId(id)))(plants);
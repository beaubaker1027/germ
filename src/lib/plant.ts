import { v4 as uuid } from 'uuid';

export interface Plant {
    readonly id: Uuid;
    readonly name: string;
    readonly tags: Tag[];
}

type Uuid = string;
type Tag = string;

export const mkPlant = ( plant: Omit<Plant, 'id'>): Plant => ({
    id: uuid(),
    ...plant
});

export const findById = ( id: Uuid ) => ( plants: Plant[] ) => 
    plants.find( plant => plant.id === id );
import { mkHasValueInKey } from './record';

export interface DBEntity {
    readonly id: Uuid;
}

export type Uuid = string;

export const hasId = mkHasValueInKey('id');
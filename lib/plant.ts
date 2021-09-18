import AsyncStorage, { AsyncStorageStatic } from "@react-native-async-storage/async-storage";
import { Tags } from "./tags";
import { getStorage, setStorage, updateStorage, deleteStorage } from "./asyncstorage";

export interface Plant {
    id: Id;
    name: Name;
    tags: Tags;
}

export type Plants = Plant[];
export type Id = string;
type Name = string;

export const getPlants = getStorage('plant');
export const setPlant = setStorage('plant');
export const updatePlant = updateStorage('plant');
export const deletePlant = deleteStorage('plant');
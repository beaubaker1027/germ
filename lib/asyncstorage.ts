import AsyncStorage, { AsyncStorageStatic } from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from 'uuid';
import { Plant, Plants, Id } from './plant';

type Key = 'plant';
type Gettable = Plant[];
type Value = Omit<Plant, 'id'>; 
type Stringify = (x:Gettable) => string;
type Parser = (x: string) => Gettable;
type Uuid = () => string;

type KeyInject<V> = (k: Key) => V

type GetStorage = KeyInject<() => Promise<Gettable>>;
type MkGetStorage = ( s: AsyncStorageStatic, p: Parser) => GetStorage;
type SetStorage = KeyInject<(val: Value) => Promise<void>>;
type MkSetStorage = ( s: AsyncStorageStatic, u: Uuid, p: Parser, st:Stringify) => SetStorage;
type UpdateStorage = KeyInject<(id: string, val:Value) => Promise<Value>>;
type MkUpdateStorage = ( s: AsyncStorageStatic, p: Parser, st: Stringify) => UpdateStorage;
type DeleteStorage = KeyInject<(id: string ) => Promise<void>>;
type MkDeleteStorage = (s: AsyncStorageStatic, p: Parser, st: Stringify) => DeleteStorage;

const mkGetStorage:MkGetStorage = 
    (storage, parse) => 
    key => 
    async () => {
        try {
            const store = await storage.getItem(key);
            if(store === null){
                return [];
            }
            return parse(store);
        } catch (e) {
            throw e;
        }
};

export const getStorage = mkGetStorage(
    AsyncStorage, 
    JSON.parse.bind(JSON)
);

const mkSetStorage:MkSetStorage = 
    ( storage, uuid, parse, stringify) => 
    key => 
    async (val) => {
        try {
            const store = await storage.getItem(key);
            if( store === null ){
                await storage.setItem(
                    key, 
                    stringify([{id:uuid(), ...val}])
                )
            } else {
                await storage.setItem(
                    key, 
                    stringify(
                        [ ...parse(store)
                        , { id:uuid(), ...val }]
                    )
                )
            }
        } catch (e){
            throw e;
        }
};

export const setStorage = mkSetStorage(
    AsyncStorage, 
    uuidv4, 
    JSON.parse.bind(JSON), 
    JSON.stringify.bind(JSON)
);

const mkUpdateStorage:MkUpdateStorage = 
    ( storage, parse, stringify ) =>
    ( key ) =>
    async ( id, value) => {
        try {
            const store = await storage.getItem(key);
            if( store === null){
                throw new Error('')
            } else {
                const storeObj = parse(store);
                const index = storeObj.findIndex(val => val.id === id);
                const newItem = {
                    ...storeObj[index],
                    ...value
                };
                const newStore = [ ...storeObj.slice(0, index), newItem, ...storeObj.slice(index + 1)];
                await storage.setItem(key, stringify(newStore));
                return newItem;
            }
        } catch (e) {
            throw e;
        }
    }

export const updateStorage = mkUpdateStorage(
    AsyncStorage, 
    JSON.parse.bind(JSON), 
    JSON.stringify.bind(JSON)
);

const mkDeleteStorage:MkDeleteStorage =
    ( storage, parse, stringify) =>
    ( key ) =>
    async ( id ) => {
        try {
            const store = await storage.getItem(key);
            if(store === null){
                return;
            } else {
                const storeObj = parse(store);
                const index = storeObj.findIndex(val => val.id === id);
                const newStore = [ ...storeObj.slice(0, index), ...storeObj.slice(index + 1)];
                await storage.setItem(key, stringify(newStore));
                return;
            }
        } catch (e) {
            throw e;
        }
    };

export const deleteStorage = mkDeleteStorage(
    AsyncStorage, 
    JSON.parse.bind(JSON), 
    JSON.stringify.bind(JSON)
);
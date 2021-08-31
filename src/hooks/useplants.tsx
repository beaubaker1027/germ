import React from "react";
import { v4 as uuid } from 'uuid';
import { mkPlant, Plant } from '../lib/plant';

type SaveItem = ( x: Omit<Plant, 'id'>) => void;

export const usePlants = ():[Plant[], ((plant: Omit<Plant, 'id'>) => void)] => {
    const [ items, setItems ] = React.useState<Plant[]>([]);

    React.useEffect(() => {
        const storedItems = ((JSON.parse(localStorage.getItem('plants') ?? '[]') as Plant[]) as Plant[]);
        setItems(storedItems);
    }, [ setItems]);

    const saveItem: SaveItem = (newPlant) => {
        const newList = [...items, mkPlant( newPlant ) ];
        try {
            localStorage.setItem('plants', JSON.stringify(newList));
            setItems(newList);
        } catch (e) {
            console.error(e.message);
        }
    }

    return [ items, saveItem ];
}
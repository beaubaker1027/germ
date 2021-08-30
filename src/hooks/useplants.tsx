import React from "react";
import { v4 as uuid } from 'uuid';
import { Item } from '../components/plantlistitem';

export const usePlants = ():[Item[], ((plant: Omit<Item, 'id'>) => void)] => {
    const [ items, setItems ] = React.useState<Item[]>([]);

    React.useEffect(() => {
        const storedItems = ((JSON.parse(localStorage.getItem('plants') ?? '[]') as Item[]) as Item[]);
        setItems(storedItems);
    }, [ setItems]);

    const saveItems = (plant: Omit<Item, 'id'>) => {
        const newList = [...items, { id: uuid(), ...plant} ] as Item[];
        try {
            localStorage.setItem('plants', JSON.stringify(newList));
            setItems(newList);
        } catch (e) {
            console.error(e.message);
        }
    }

    return [ items, saveItems ];
}
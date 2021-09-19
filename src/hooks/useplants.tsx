import React from "react";
import * as F from 'fp-ts/function';
import * as IO from 'fp-ts/IO';
import * as E from 'fp-ts/Either';
import { getPlants, Plant } from '../lib/plant';

export const usePlants = ():[Plant[], String ] => {
    const [ items, setItems ] = React.useState<Plant[]>([]);
    const [ error, setError ] = React.useState<String>('');

    const handlePlants = React.useCallback(F.pipe(
        getPlants,
        IO.map(
            E.fold(
                (e) => setError('There was an issue fetching plants'),
                setItems
            )
        )
    ), [ setItems, setError ]);

    React.useEffect(() => {
        handlePlants();
    }, [ handlePlants]);

    return [ items, error ];
}
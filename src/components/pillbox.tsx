import React from 'react';
import { Hash } from './';

interface Props {
    labels: string[];
    callback: ( items: string[]) => void;
}

interface Item {
    label: string,
    active: boolean
};

function mkItem(label: string = "", active: boolean = false){
    return(
        { label
        , active }
    );
};

function Pillbox({ labels = [], callback = (l = []) => {} }:Props){
    
    const [ items, setItems ] = React.useState(labels.map((l) => mkItem(l)));

    const activeItems = React.useMemo(
        () => items.filter(({active}) => active), 
        [ items ]
    );

    React.useEffect(
        ()=>{
            callback(activeItems.map(({ label }) => label));
        }, 
        [ callback, activeItems ]
    )

    return(
        <div>
            {
                items.map(({label, active}, i) => <Hash to={`${active}`}>{label}</Hash>)
            }
        </div>
    )
}

export default Pillbox;
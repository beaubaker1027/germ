import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as F from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { Background } from '../../components';
import Header from '../../components/header';
import { InfoParams } from '../../App';
import { usePlants } from '../../hooks/useplants';
import { findById, Plant } from '../../lib/plant';
import PlantInfo from '../../components/info';

// CONSTANTS
// INTERFACES
interface Props extends React.PropsWithChildren<unknown> {
}

// ALIASES

// LOCAL COMPONENTS


// DEFAULT PROPS

// COMPONENT
function Component(props: Props) {
// ...CODE...
    const { id } = useParams<InfoParams>();
    const [ items ] = usePlants();
    const plant = React.useMemo<Plant | undefined>(
        () => F.pipe(
            findById(id)(items), 
            O.fold(
                () => undefined,
                s => s
            )
        ),
        [ id, items ]
    );
    
    return (
        <Background>
            <Header/>
            {
                plant && <PlantInfo plant={plant}/>
            }
        </Background>
    );
}

export default Component;
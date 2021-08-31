import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Background } from '../../components';
import Header from '../../components/header';
import { InfoParams } from '../../App';
import { usePlants } from '../../hooks/useplants';
import { findById } from '../../lib/plant';
import PlantInfo from '../../components/info';

// CONSTANTS
// INTERFACES
interface Props extends React.PropsWithChildren<unknown> {
}

// ALIASES

// LOCAL COMPONENTS


// DEFAULT PROPS

// COMPONENT
const Component = (props: Props) => {
// ...CODE...
    const { id } = useParams<InfoParams>();
    const [ items ] = usePlants();
    const plant = React.useMemo(
        () => findById(id)(items),
        [ id, items ]
    );
    
    return (
        <Background>
            <Header/>
            <PlantInfo plant={plant}/>
        </Background>
    );
}

export default Component;
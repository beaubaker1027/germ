import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as F from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { Background } from '../../components';
import Header from '../../components/header';
import { InfoParams } from '../../App';
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
    
    return (
        null
    );
}

export default Component;
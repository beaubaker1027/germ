import React from 'react';
import styled from 'styled-components/native';
import { Plant } from '../lib/plant';
import { Row } from './container';
import Tag from './tag';

// CONSTANTS
// INTERFACES
interface Props extends React.PropsWithChildren<unknown> {
    plant: Plant
}

// ALIASES

// LOCAL COMPONENTS
const View = styled.View``;

const TouchableOpacity = styled.TouchableOpacity`
    padding: 10px 0px;
`;

const Text = styled.Text`
    color: ${ props => props.theme.colors.secondary };
    font-size: 10px;
`;

const Header = styled(Text)`
    font-size: 16px;
`;

// DEFAULT PROPS

// COMPONENT
const PlantListItem = (props: Props) => 
    <View>
        <TouchableOpacity>
            <Header>{props.plant.name}</Header>
        </TouchableOpacity>
            <Row>
            {
                props.plant.tags.map( (tag, i) => 
                    <Tag key={i} edge={i==0}>{`#${tag}`}</Tag>  
                )
            }
            </Row>
    </View>

export default PlantListItem;
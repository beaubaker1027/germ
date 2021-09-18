import React from 'react'
import styled from 'styled-components/native';

interface Props extends React.PropsWithChildren<unknown> {
    edge?: boolean;
}

const TouchableOpacity = styled.TouchableOpacity<{edge?: boolean}>`
    padding: ${props => props.edge ? '0px' : '0px 5px'};
`;
const Text = styled.Text`
    color: ${ props => props.theme.colors.secondary };
    font-size: 10px;
`;

const Tag = (props:Props) =>
    <TouchableOpacity edge={props.edge}>
        <Text>{props.children}</Text>
    </TouchableOpacity> 

export default Tag;
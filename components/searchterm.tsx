import React from 'react';
import styled from 'styled-components/native';
import { Row } from './container';

// INTERFACES
interface Props extends React.PropsWithChildren<unknown> {
    onClose: () => void;
    edge?: boolean;
}

interface Hoverable {
    hover: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}


const View = styled(Row)<Hoverable & {edge?: boolean}>`
    border-radius: 10px;
    opacity: ${props => props.hover ? 0.7 : 1};
    border: solid ${props => props.theme.colors.secondary} 1px;
    padding: 5px;
    margin: ${props => props.edge ? '0px 5px 0px 0px' : '0px 5px'};
`;

const Close = styled.TouchableOpacity<Hoverable>`
    padding: 0px 0px 0px 5px;
    opacity: ${props => props.hover ? 0.7 : 1}
`;

const Button = styled.TouchableWithoutFeedback`
    padding: 0px 5px 0px 5px;
`;

const Text = styled.Text`
    color: ${props => props.theme.colors.secondary}
`;

const SmallText = styled.Text`
    color: ${props => props.theme.colors.primary}
`;

const SearchTerm = (props:Props) =>{

    const [hover, setHover ] = React.useState(false);
    const [hoverClose, setHoverClose ] = React.useState(false);
    return (
        <View
            edge={props.edge}
            hover={hover}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={()=> setHover(false)}
        >
            <Button>
                <Text>
                    {props.children}
                </Text>
            </Button>
            <Close
                onPress={props.onClose}
                hover={hoverClose}
                onMouseEnter={()=> setHoverClose(true)}
                onMouseLeave={()=> setHoverClose(false)}
            >
                <SmallText>X</SmallText>
            </Close>
        </View>
    );
};

export default SearchTerm;
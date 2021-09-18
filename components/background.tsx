import React from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import {Theme} from '../theme';
import styled from 'styled-components/native';
import { useHeaderHeight } from '@react-navigation/elements';

// CONSTANTS
// INTERFACES
interface Props extends React.PropsWithChildren<unknown> {

}

// ALIASES

// LOCAL COMPONENTS
const View = styled.View<{headerHeight: number}>`
    flex: 1;
    background-color: ${props => props.theme.colors.background};
    padding-top: ${props => props.headerHeight ?? 0 }px;
`;

// DEFAULT PROPS

// COMPONENT
const Background = (props: Props) => {

    const headerHeight = useHeaderHeight();
    return(
        <TouchableWithoutFeedback onPress={Platform.OS !== 'web' ? Keyboard.dismiss : undefined}>
            <View headerHeight={headerHeight}>
                {props.children}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Background;
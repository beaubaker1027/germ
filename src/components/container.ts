import styled from 'styled-components';

export const Background = styled.div.attrs({
        className: 'flex flex-column w100 h-100'
})`
    background-color: ${props => props.theme.colors.background};
`;


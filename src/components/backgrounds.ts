import styled from 'styled-components';

//Backgrounds
export const Background = styled.div.attrs({
    className: 'flex flex-column flex-auto w100 h-100'
})`
    background-color: ${props => props.theme.colors.background};
`;

export const CenteredBackground = styled(Background).attrs<{className: string}>(props => ({
    className: `items-center justify-center ${props.className}`
}))``;
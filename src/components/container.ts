import styled from 'styled-components';


export const Row = styled.div.attrs({
    className: 'flex flex-row flex-auto w100 h-100'
})``;

export const Column = styled.div.attrs({
    className: 'flex flex-column flex-auto w100 h-100'
})``;

export const Background = styled(Column)`
    background-color: ${props => props.theme.colors.background};
`;


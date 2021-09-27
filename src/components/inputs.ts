import styled from 'styled-components';

export const Input = styled.input.attrs({
    className: 'pa2 outline-0 b0 '
})`
    width: 200px;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};
    border-width: 0px;
`;
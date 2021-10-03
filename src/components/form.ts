import styled from 'styled-components';

export const Label = styled.label.attrs({
    className: 'pa2'
})<{for:string}>`
    font-size: 16px;
    color: ${props => props.theme.colors.secondary}
`;

export const Input = styled.input.attrs({
    className: 'pa2 outline-0 b0 w-100 br1'
})`
    width: 400px;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.secondary};
    border: 1px solid ${props => props.theme.colors.secondary};
    @media (max-width: ${props => props.theme.width}px){
        min-width: 100%;
    }
`;

export const TextArea = styled(Input).attrs({
    as: 'textarea'
})`
    min-height: 100px;
`;

export const ErrorMessage = styled.span.attrs({
    className: 'pv2'
})`
    color: ${props => props.theme.colors.error};
    &:before{
        content: '*';
    }
`;

export const Submit = styled.input.attrs({
    className: 'pa2',
    type: 'submit'
})`
    border: 1px solid ${props => props.theme.colors.secondary};
`;
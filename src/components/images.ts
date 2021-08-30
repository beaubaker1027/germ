import styled from 'styled-components';
import Logo from '../assets/logo.svg';

interface Icon {
    icon: string;
}

export const Icon = styled.i.attrs({
    className: 'pa2'
})<Icon>`

background: url(${props => props.icon});
background-size: contain;
background-position: center;
background-repeat: no-repeat;
`;

export const LargeLogo = styled.img.attrs({
    src: Logo
})`height: 200px;`;

export const SmallLogo = styled(LargeLogo)`height: 16px;`;
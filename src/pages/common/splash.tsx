import React from 'react';
import styled, { keyframes } from 'styled-components';
import { LargeLogo, Link, Background, H1 } from '../../components';

const fadeIn = keyframes`
    0% { opacity: 0 };
    100% { opacity: 1 };
`;

const Logo = styled(LargeLogo)`
    margin-bottom: 20px;
`;

const Title = styled(H1)`
    margin-bottom: 45px;
    animation-name: ${fadeIn};
    animation-duration: 2s;
`

const CenteredBackground = styled(Background).attrs<{className: string}>(props => ({
    className: `items-center justify-center ${props.className}`
}))``;

const entryText = 'Get Started';
const defaultEntryLink = '/plants';

interface Props {
    entryLink?: string;
}

function Splash({ 
    entryLink = defaultEntryLink
}:Props){
    return (
        <CenteredBackground>
            <Logo/>
            <Title>Germ</Title>
            <Link to={entryLink}>{entryText}</Link>
        </CenteredBackground>
    )
}

export default Splash;
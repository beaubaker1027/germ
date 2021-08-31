import React from 'react';
import styled from 'styled-components';
import { LargeLogo, Link, Background } from '../../components';


const Logo = styled(LargeLogo)`
    margin-bottom: 45px;
`;

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
            <Link to={entryLink}>{entryText}</Link>
        </CenteredBackground>
    )
}

export default Splash;

//3:07:00 ZABOOMAFOO CEREMOR Gamedev or Modding
import React from 'react';
import styled from 'styled-components';
import { LargeLogo, Link, CenteredBackground } from '../../components';


const Logo = styled(LargeLogo)`
    margin-bottom: 45px;
`;

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
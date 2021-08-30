import React from "react";

export const useBreakPoint = (breakPoints = []) => {
    const [ width, setWidth ] = React.useState(window.innerWidth);
    const [ height, setHeight ] = React.useState(window.innerHeight);

    const [ widthBreakpoint = 0, heightBreakPoint = 0 ] = breakPoints;

    React.useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        })
    },[]);

    return [ width > widthBreakpoint, height > heightBreakPoint ];
}
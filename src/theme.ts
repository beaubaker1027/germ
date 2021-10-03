export interface Theme {
    readonly width: number;
    readonly colors: {
        readonly primary: string;
        readonly secondary: string;
        readonly background: string;
        readonly error: string;
    };
}

const theme:Theme = {
    width: 800,
    colors: {
        primary: '#00FFFF',
        secondary: '#F2F2F2',
        background: '#000000',
        error: '#ff6363'
    }
}

export default theme;
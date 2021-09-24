export interface Theme {
    readonly width: number;
    readonly colors: {
        readonly primary: string;
        readonly secondary: string;
        readonly background: string;
    };
}

const theme:Theme = {
    width: 800,
    colors: {
        primary: '#00FFFF',
        secondary: '#F2F2F2',
        background: '#000000'
    }
}

export default theme;
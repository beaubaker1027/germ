import '@types/styled-components-react-native';
import { Theme } from './theme';

declare module 'styled-components/native' {
    export interface DefaultTheme extends Theme {
    }
}
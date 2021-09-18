import { Platform } from 'react-native';
import styled from 'styled-components/native';

// ALIASES

// LOCAL COMPONENTS
const Search = styled.TextInput.attrs(props => ({
    placeholderTextColor: props.theme.colors.primary,
    placeholder: "Search"
}))`
    margin: 0px;
    padding: 10px 0px 10px 0px;
    border-width: 0px;
    font-size: 20px;
    color: ${props => props.theme.colors.primary}
    ${ _ => Platform.OS === 'web' && 'outline-width: 0px' }
`;

export default Search;
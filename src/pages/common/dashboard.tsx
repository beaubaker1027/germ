import React from 'react';
import * as Recompose from 'recompose';
import * as A from 'fp-ts/Array';
import * as S from 'fp-ts/string';
import * as IO from 'fp-ts/IO';
import * as E from 'fp-ts/Either';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Body } from '../../components/layout';
import { Background } from '../../components';
import SearchBar from '../../components/search';
import List from '../../components/list';
import ListItem from '../../components/plantlistitem';
import { getPlants, Plant } from '../../lib/plant';
import { pipe } from 'fp-ts/lib/function';

// Interfaces
interface Props extends React.PropsWithChildren<unknown> {
    C: Components;
    filterCurrentList: filterCurrentList;
    handleKeyPress: ReturnType<handleKeyPress>
    searchText: string;
    setSearchText: setSearchText;
    tags: string[];
    setTags: setTags;
    items: Plant[];
    setItems: setItems;
    error?: string;
    setError: setError;
}

interface Components {
    Background: typeof Background;
    Body: typeof Body;
    Header: typeof Header;
    Footer: typeof Footer;
    SearchBar: typeof SearchBar;
    List: typeof List;
    ListItem: typeof ListItem;
}
interface filterCurrentList {
    (list: Plant[], filterables: string[]):Plant[];
}

interface handleKeyPress {
    (props: Props):React.KeyboardEventHandler<HTMLInputElement>;
}

interface setSearchText {
    (str: string): void;
}

interface setTags {
    (tags: string[]): void;
}

interface setItems {
    (plants: Plant[]): void;
}

interface setError {
    (error: string): void;
}
// LOCAL COMPONENTS

// Defaults
const filterCurrentList: filterCurrentList = ( list: Plant[], filterables: string[] ) =>
    A.filter<Plant>( item  => 
        A.every<string>( searchTerm => 
            S.Eq.equals(S.toLowerCase(item.name), S.toLowerCase(searchTerm)) || 
            A.some<string>(tag => S.toLowerCase(tag) === S.toLowerCase(searchTerm))(item.tags) )(filterables)
    )(list);

const handleKeyPress:handleKeyPress = (props) => (event) => {
    props.searchText && event.key === 'Enter' &&
        props.setTags(A.append(props.searchText)(props.tags));
}

const components: Components = {
    Background,
    Body,
    Header,
    Footer,
    SearchBar,
    List,
    ListItem,
};

// Component

function Dashboard(props:Props) {

    const currentList = A.isEmpty(props.tags) ? props.items : props.filterCurrentList(props.items, props.tags);

    return (
        <props.C.Background>
            <props.C.Header/>
            <props.C.Body>
                <div>
                    <props.C.SearchBar callback={props.setSearchText} onKeyPress={props.handleKeyPress}/>
                </div>
                <props.C.List<Plant> listItem={props.C.ListItem} list={currentList}/>
            </props.C.Body>
            <props.C.Footer/>
        </props.C.Background>
    )
};

const enhance = Recompose.compose<Props, unknown>(
    Recompose.withState('searchText', 'setSearchText', ''),
    Recompose.withState('tags', 'setTags', []),
    Recompose.withState( 'items', 'setItems', []),
    Recompose.withState( 'error', 'setError', undefined),
    Recompose.withHandlers({
        handleKeyPress
    }),
    Recompose.withProps({
        filterCurrentList,
        C: components
    }),
    Recompose.lifecycle<Props, unknown>({
        componentDidMount(){
            pipe(
                getPlants,
                IO.map(
                    E.fold(
                        (e) => this.props.setError('There was an issue fetching plants'),
                        this.props.setItems
                    )
                )
            )()
        }
    })
);

export default enhance(Dashboard)
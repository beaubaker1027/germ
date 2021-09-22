import React from 'react';
import * as Recompose from 'recompose';
import * as A from 'fp-ts/Array';
import * as S from 'fp-ts/string';
import * as IO from 'fp-ts/IO';
import * as P from 'fp-ts/Predicate';
import * as E from 'fp-ts/Either';
import styled from 'styled-components';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Body } from '../../components/layout';
import { Background } from '../../components';
import SearchBar from '../../components/search';
import List from '../../components/list';
import ListItem from '../../components/plantlistitem';
import { getPlants, Plant } from '../../lib/plant';
import { flow, pipe } from 'fp-ts/lib/function';
import { trace } from '../../lib/debug';

// Interfaces
interface Props extends React.PropsWithChildren<unknown> {
    C: Components;
    filterCurrentList: filterCurrentList;
    searchText: string;
    setSearchText: setSearchText;
    items: Plant[];
    setItems: setItems;
    error?: string;
    setError: setError;
}

type PostInjectProps = Omit<
    Props
    , 'C' 
    | 'filterCurrentList' 
    | 'searchText' 
    | 'setSearchText' 
    | 'items' 
    | 'setItems' 
    | 'error' 
    | 'setError'>;

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
    (list: Plant[], searchText: string ):Plant[];
}

interface handleKeyPress {
    (props: Props):React.KeyboardEventHandler<HTMLInputElement>;
}

interface setSearchText {
    (str: string): void;
}

interface setItems {
    (plants: Plant[]): void;
}

interface setError {
    (error: string): void;
}
// LOCAL COMPONENTS

// Defaults
const filterCurrentList: filterCurrentList = ( list, searchTerm ) =>
    A.filter<Plant>( item  => 
        P.or<string>( 
            searchTerm => S.includes(S.toLowerCase(searchTerm))(S.toLowerCase(item.name)) 
        ) ( 
            searchTerm =>  A.some<string>(tag => S.includes(S.toLowerCase(searchTerm))(S.toLowerCase(tag)))(item.tags) 
        )(searchTerm)
    )(list);

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

    const currentList = S.isEmpty(props.searchText) ? props.items : props.filterCurrentList(props.items, props.searchText);

    return (
        <props.C.Background>
                <props.C.Header/>
                <props.C.Body>
                    <div>
                        <props.C.SearchBar onChange={(e) => props.setSearchText(e.target.value)}/>
                    </div>
                    <props.C.List<Plant> listItem={props.C.ListItem} list={currentList}/>
                </props.C.Body>
                <props.C.Footer/>
        </props.C.Background>
    )
};

const enhance = Recompose.compose<Props, PostInjectProps>(
    Recompose.withState('searchText', 'setSearchText', ''),
    Recompose.withState( 'items', 'setItems', []),
    Recompose.withState( 'error', 'setError', undefined),
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
                        flow(
                            e => trace(e as Error),
                            _ => this.props.setError('There was an issue fetching plants')
                        ),
                        this.props.setItems
                    )
                )
            )();
        }
    })
);

export default enhance(Dashboard);
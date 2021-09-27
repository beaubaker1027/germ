import React from 'react';
import * as Recompose from 'recompose';
import { Link } from 'react-router-dom';
import * as A from 'fp-ts/Array';
import * as S from 'fp-ts/string';
import * as IO from 'fp-ts/IO';
import * as P from 'fp-ts/Predicate';
import * as E from 'fp-ts/Either';
import styled from 'styled-components';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Background, Body, Row, Column, ActionLink, MaxWidth } from '../../components';
import SearchBar from '../../components/search';
import List from '../../components/list';
import ListItem from '../../components/plantlistitem';
import { Plant } from '../../lib/plant'
import { getPlants } from '../../api/storage';
import { flow, pipe } from 'fp-ts/lib/function';
import { trace } from '../../lib/debug';

// Interfaces
interface Props extends React.PropsWithChildren<unknown> {
    filterCurrentList: filterCurrentList;
    searchText: string;
    setSearchText: setSearchText;
    items: Plant[];
    setItems: setItems;
    error?: string;
    setError: setError;
}

type ComposedProps = 
    'filterCurrentList' 
    | 'searchText' 
    | 'setSearchText' 
    | 'items' 
    | 'setItems' 
    | 'error' 
    | 'setError';

type PostInjectProps = Omit<Props, ComposedProps>;

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
const SpacedRow = styled(Row)`
    justify-content: space-between;
`;

const SLink = styled(Link).attrs({
    className: 'pa2 br4'
})`
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background};
    text-decoration: none;
    font-weight: bold;

    &:hover {
        opacity: .75;
    }
    &:active {
        opacity: .5;
    }
`;

// Defaults
const filterCurrentList: filterCurrentList = ( list, searchTerm ) =>
    A.filter<Plant>( item  => 
        P.or<string>( 
            searchTerm => S.includes(S.toLowerCase(searchTerm))(S.toLowerCase(item.name)) 
        ) ( 
            searchTerm =>  A.some<string>(tag => S.includes(S.toLowerCase(searchTerm))(S.toLowerCase(tag)))(item.tags) 
        )(searchTerm)
    )(list);

// Component
  
function Dashboard(props:Props) {

    const currentList = S.isEmpty(props.searchText) ? props.items : props.filterCurrentList(props.items, props.searchText);

    return (
        <Background centerHorizontal>
            <MaxWidth>
                <Header title={'Dashboard'}/>
                <Body>
                    <SpacedRow padded centerVertical>
                        <SearchBar onChange={(e) => props.setSearchText(e.target.value)}/>
                        <ActionLink to={'/plants/add'}>+ Add</ActionLink>
                    </SpacedRow>
                    <List<Plant> listItem={ListItem} list={currentList}/>
                </Body>
                <Footer/>
            </MaxWidth>
        </Background>
    )
};

const enhance = Recompose.compose<Props, PostInjectProps>(
    Recompose.withState('searchText', 'setSearchText', ''),
    Recompose.withState( 'items', 'setItems', []),
    Recompose.withState( 'error', 'setError', undefined),
    Recompose.withProps({
        filterCurrentList
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
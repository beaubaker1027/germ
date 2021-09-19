import React from 'react';
import Recompose from 'recompose';
import * as A from 'fp-ts/Array';
import * as S from 'fp-ts/string';
import { usePlants } from '../../hooks/useplants';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Body } from '../../components/layout';
import { Background } from '../../components';
import SearchBar from '../../components/search';
import List from '../../components/list';
import ListItem from '../../components/plantlistitem';
import { Plant } from '../../lib/plant';
import { pipe } from 'fp-ts/lib/function';

// Interfaces
interface Props extends React.PropsWithChildren<unknown> {
    filterCurrentList: filterCurrentList
}

interface filterCurrentList{
    (list: Plant[], filterables: string[]):Plant[]
}

// LOCAL COMPONENTS

// Defaults
const filterCurrentList: filterCurrentList = ( list: Plant[], filterables: string[] ) =>
    A.filter<Plant>( item  => 
        A.every<string>( searchTerm => 
            S.Eq.equals(S.toLowerCase(item.name), S.toLowerCase(searchTerm)) || 
            A.some<string>(tag => S.toLowerCase(tag) === S.toLowerCase(searchTerm))(item.tags) )(filterables)
    )(list);

// Component

function Dashboard(props:Props) {
    const [ searchText, setSearchText ] = React.useState('');
    const [ tags, setTags] = React.useState<string[]>([]);
    const [ items, errors ] = usePlants();

    const currentList = React.useMemo(() => 
        A.isEmpty(tags) ? items : props.filterCurrentList(items, tags), 
        [ items, searchText, tags ]
    );

    const handleKeyPress:React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        searchText && event.key === 'Enter' &&
           setTags(A.append(searchText)(tags));
        setSearchText('');

    }

    return (
        <Background>
            <Header/>
            <Body>
                <div>
                    <SearchBar callback={setSearchText} onKeyPress={handleKeyPress}/>
                </div>
                <List<Plant> listItem={ListItem} list={currentList}/>
            </Body>
            <Footer/>
        </Background>
    )
};

export default pipe(
    Dashboard,
    Recompose.defaultProps({
        filterCurrentList
    })
);
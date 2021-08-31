import React from 'react';
import { usePlants } from '../../hooks/useplants';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Body } from '../../components/layout';
import { Background } from '../../components';
import SearchBar from '../../components/search';
import List from '../../components/list';
import ListItem from '../../components/plantlistitem';
import { Plant } from '../../lib/plant';

// Interfaces
interface Props extends React.PropsWithChildren<unknown> {
}

// LOCAL COMPONENTS

// Defaults

// Component

function Dashboard(props:Props) {
    const [ searchText, setSearchText ] = React.useState('');
    const [ activeTags, setActiveTags ] = React.useState<string[]>([]);
    const [ tags, setTags] = React.useState<string[]>([]);
    const [ items, setItems ] = usePlants();

    function filterCurrentList( list: Plant[], filterables: string[] ){
        return list.filter(function(listItem){
            return filterables.some(function(filterItem){
                return listItem
                        .name
                        .toLowerCase()
                        .search(new RegExp(`^${filterItem.toLowerCase()}`)) >= 0;
            });
        });
    }

    const currentList = React.useMemo(() => 
        filterCurrentList(items, [ searchText, ...activeTags ]), 
        [ items, searchText, activeTags.length]
    );

    return (
        <Background>
            <Header/>
            <Body>
                <div>
                    <SearchBar callback={setSearchText}/>
                </div>
                <List<Plant> listItem={ListItem} list={currentList}/>
            </Body>
            <Footer/>
        </Background>
    )
};

export default Dashboard;
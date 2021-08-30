import React from 'react';
import { usePlants } from '../../hooks/useplants';
import Header from '../../components/header';
import { Background } from '../../components';
import SearchBar from '../../components/search';
import List from '../../components/list';
import ListItem, { Item } from '../../components/plantlistitem';

// Interfaces
interface Props extends React.PropsWithChildren<unknown> {
}

interface Components {
    Background: typeof Background;
    Header: typeof Header;
    SearchBar: typeof SearchBar;
    List: typeof List;
    ListItem: typeof ListItem;
}

interface Hooks {
    usePlants: typeof usePlants;
    useState: typeof React.useState;
    useEffect: typeof React.useEffect;
    useMemo: typeof React.useMemo;
}

// Defaults

// Component

const Dashboard = ({
    ...props }:Props
) => {
    const [ searchText, setSearchText ] = React.useState('');
    const [ activeTags, setActiveTags ] = React.useState<string[]>([]);
    const [ tags, setTags] = React.useState<string[]>([]);
    const [ items, setItems ] = usePlants();

    function filterCurrentList( list: Item[], filterables: string[] ){
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
            <div>
                <SearchBar callback={setSearchText}/>
            </div>
            <List<Item> listItem={ListItem} list={currentList}/>
        </Background>
    )
};

export default Dashboard;
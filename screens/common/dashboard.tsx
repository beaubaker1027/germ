import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components/native';
import Background from '../../components/background';
import Search from '../../components/search';
import { FlatList } from 'react-native';
import PlantListItem from '../../components/plantlistitem';
import { Box, Row } from '../../components/container';
import SearchTerm from '../../components/searchterm';
import { useTags } from '../../lib/tags';
import { getPlants, Plant, Plants } from '../../lib/plant';

// const defaultData:Plant[] = [
//     {
//         id: uuidv4(),
//         name: 'potato',
//         tags: [ 'hello']
//     },
//     {
//         id: uuidv4(),
//         name: 'radish',
//         tags: [ 'hello', 'hi' ]
//     },
//     {
//         id: uuidv4(),
//         name: 'cucumber',
//         tags: []
//     }
// ];

// AsyncStorage.removeItem('plant');
// AsyncStorage.setItem('plant', JSON.stringify(defaultData));

// LOCAL COMPONENTS
const TagBox = styled(Row)`
    padding: 10px 0px;
    border: 0px solid ${props => props.theme.colors.secondary};
    border-bottom-width: 1px;
`;


const Dashboard = () => {

    const [ search, setSearch ] = React.useState('');
    const [ plants, setPlants ] = React.useState<Plants>([]);
    const [ tags, addTag, removeTag ] = useTags();

    React.useEffect(() => {
        const fn = async () => {
            await getPlants()
                .then(plants => {
                    console.log(plants)
                    setPlants(plants)
                })
                .catch( e => alert(e));
        }
        fn();
    },[])

    const data = React.useMemo(
        () => 
            tags.length ? 
            plants.filter(d => 
                tags.includes(d.name.toLowerCase()) || 
                d.tags.filter(t => tags.includes(t.toLowerCase())).length
            ) :
            plants, 
        [ tags.length, plants.length ]
    );

    return (
        <Background>
            <Box>
                <Search 
                    blurOnSubmit={true}
                    value={search}
                    onChangeText={setSearch} 
                    returnKeyLabel={'add'} 
                    returnKeyType='search'

                    onSubmitEditing={ _ => {
                        addTag(search.toLowerCase())
                        setSearch('');
                    }}/>
                <TagBox>
                {
                    tags.map((tag, i) => 
                        <SearchTerm edge={i == 0} onClose={() => removeTag(tag)} key={tag}>{tag}</SearchTerm>
                    )
                }
                </TagBox>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <PlantListItem plant={item}/>}
                />
            </Box>
        </Background>
    )
};

export default Dashboard;
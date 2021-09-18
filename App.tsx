import 'react-native-get-random-values';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components/native';
import theme from './theme';
import Dashboard from './screens/common/dashboard';
import Create from './screens/plants/create';
import Edit from './screens/plants/edit';
import Info from './screens/plants/info';

const Stack = createStackNavigator();


function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Dashboard' 
          screenOptions={{
            headerTransparent: true, 
            headerShown: true,
            headerTitleStyle: {
              color: theme.colors.secondary
            }
          }}
          >
          <Stack.Screen name='Dashboard' component={Dashboard} />
          <Stack.Screen name='Create' component={Create} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
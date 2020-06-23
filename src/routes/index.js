import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import SearchCep from '../pages/SearchCep';
import AddressCep from '../pages/AddressCep';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{ cardStyle: { backgroundColor: '#0a385d' } }}
      >
        <Stack.Screen name="Home" component={SearchCep} />
        <Stack.Screen name="Address" component={AddressCep} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;

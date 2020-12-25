import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import InitialScreen from '../screens/InitialScreen/index';
import Constants from '../utils/Constants';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
        headerStyle={{
          color: 'white',
        }}>
        <Stack.Screen
          name="InstaMovies"
          component={InitialScreen}
          options={{
            headerStyle: {
              backgroundColor: Constants.PRIMARY_COLOR,
            },
            headerTitleStyle: {
              color: 'white',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

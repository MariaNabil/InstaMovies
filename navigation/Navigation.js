import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import InitialScreen from '../screens/InitialScreen/index';
import {SafeAreaView} from 'react-native';
import AddMovie from '../screens/AddMovie/AddMovie';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <SafeAreaView style={{flex: 1}}>
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
                backgroundColor: '#F5FCFF',
              },
              headerTitleStyle: {
                alignSelf: 'center',
              },
            }}
          />
          <Stack.Screen
            name="Add Movie"
            component={AddMovie}
            options={{
              headerStyle: {
                backgroundColor: '#F5FCFF',
              },
              headerTitleStyle: {},
            }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

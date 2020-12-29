import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import InitialScreen from '../screens/InitialScreen/index';
import Constants from '../utils/Constants';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
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
            // options={({navigation, route}) => ({
            //   headerRight: () => (
            //     <TouchableOpacity
            //       onPress={() => navigation.navigate('Add a Post')}>
            //       <Text
            //         style={{
            //           marginHorizontal: 20,
            //           color: 'white',
            //           textAlignVertical: 'center',
            //           borderRadius: 20,
            //           backgroundColor: '#EE4646',
            //           paddingHorizontal: 20,
            //           paddingVertical: 10,
            //           alignSelf: 'center',
            //           fontSize: 20,
            //         }}>
            //         +
            //       </Text>
            //     </TouchableOpacity>
            //   ),
            // })}
          />
          <Stack.Screen
            name="Add Movie"
            component={AddMovie}
            options={{
              headerStyle: {
                backgroundColor: '#F5FCFF',
              },
              headerTitleStyle: {
                // alignSelf: 'center',
              },
            }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

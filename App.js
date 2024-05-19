import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from "./screens/main.js";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Main} initialParams={{ link: 'https://gwhatchet.com/' }}/>
        <Stack.Screen name="News" component={Main} initialParams={{ link: 'https://gwhatchet.com/category/news/' }}/>
        <Stack.Screen name="Multimedia" component={Main} initialParams={{ link: 'https://gwhatchet.com/category/photo/' }}/>
        <Stack.Screen name="Podcasts" component={Main} initialParams={{ link: 'https://gwhatchet.com/category/podcasts/' }}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;

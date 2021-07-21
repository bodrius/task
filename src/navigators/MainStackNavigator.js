import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen/FavoritesScreen';

const Tab = createMaterialTopTabNavigator();

export const MainStackNavigator = () => {
  return (
    <Tab.Navigator tabBarPosition="bottom">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorite" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

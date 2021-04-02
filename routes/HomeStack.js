import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../scripts/HomeScreen'
import AddWine from '../scripts/AddWineScreen'

const screens = {
    Home: {
        screen: HomeScreen,
    },
    AddWine: {
        screen: AddWine,
    },
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SQLite from 'expo-sqlite';
import HomeScreen from './scripts/HomeScreen.js'
import AddWine from './scripts/AddWineScreen.js'

const Drawer = createDrawerNavigator();

export default class App extends Component {
	render() {

		return (
			<NavigationContainer>
				<Drawer.Navigator initialRouteName="Home">
					<Drawer.Screen name="Home" component={HomeScreen} />
					<Drawer.Screen name="Add Wine" component={AddWine} />
				</Drawer.Navigator>
			</NavigationContainer>
		);
		
	};
}
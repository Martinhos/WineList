import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SQLite from 'expo-sqlite';
import MyCollection from './scripts/CollectionScreen.js'
import AddWine from './scripts/AddWineScreen.js'

const Drawer = createDrawerNavigator();

export default class App extends Component {
	render() {

		return (
			<NavigationContainer>
				<Drawer.Navigator initialRouteName="My Collection">
					<Drawer.Screen name="My Collection" component={MyCollection} />
					<Drawer.Screen name="Add Wine" component={AddWine} />
				</Drawer.Navigator>
			</NavigationContainer>
		);
		
	};
}
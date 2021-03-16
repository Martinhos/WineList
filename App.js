import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './scripts/HomeScreen.js'
import MenuScreen from './scripts/MenuScreen.js'

const Drawer = createDrawerNavigator();

export default function App() {
		return (
			<NavigationContainer>
				<Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen name="Home" component={HomeScreen} />
				<Drawer.Screen name="Menu" component={MenuScreen} />
				</Drawer.Navigator>
			</NavigationContainer>
		);
}
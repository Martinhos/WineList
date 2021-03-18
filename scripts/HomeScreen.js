import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import * as SQLite from 'expo-sqlite';
import styles from '../app/config/colors.js'




export default class HomeScreen extends Component {

	render() {

		return (
			<View style={{flex: 1}}>
				<ImageBackground source={require('../app/assets/Wood_Backgroud.jpg')} style={styles.image_background}>
					<View style={styles.menu_bar}>
						<View style={{flex: 1, flexDirection: 'row', alignItems:'flex-end'}}>
							<TouchableOpacity onPress={() => {
								this.props.navigation.openDrawer();
							}}>
								<Image
								style={styles.menu_icon}
								source={require('../app/assets/menu_icon.png')}
								
								/>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.container}>
						<TouchableOpacity onPress={() => {


						}}>
							<Image
							source={require('../app/assets/Wine_Bottle.jpg')}
							fadeDuration={300}
							/>						
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</View>
		);
	};
};
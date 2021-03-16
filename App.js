import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight, TouchableOpacity, Button, TouchableOpacityBase } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import query_2_db from './scripts/DB_Query.js'



const Drawer = createDrawerNavigator();

function HomeScreen ({navigation}) {

	return (
		<View style={{flex: 1}}>
			<View style={styles.menu_bar}>
				<View style={{flex: 1, flexDirection: 'row', alignItems:'flex-end'}}>
					<TouchableOpacity onPress={() => {
						navigation.openDrawer();
					}}>
						<Image
						style={styles.menu_icon}
						source={require('./app/assets/menu_icon.png')}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.container}>
				<View style={styles.button}>
					<TouchableOpacity onPress={() => {
						query_2_db('select * from Vinhos')
					}}>
						<Image
						source={require('./app/assets/Wine_Bottle.jpg')}
						fadeDuration={300}
						/>						
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

function MenuScreen ({ navigation }) {
		return(
			<View style={{flex: 1}}>
				<View style={styles.menu_bar}>
					<View style={{flex: 1, flexDirection: 'row', alignItems:'flex-end'}}>
						<TouchableOpacity onPress={() => {
							navigation.openDrawer();
						}}>
							<Image
							style={styles.menu_icon}
							source={require('./app/assets/menu_icon.png')}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.container}>
					<Text>This is another screen!</Text>
					<Button
						title={'Go Back'}
						onPress={() => {
							navigation.goBack();
						}}
					/>
				</View>
			</View>
		);
}

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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	navigationContainer: {
		backgroundColor: "#ecf0f1"
	},
	paragraph: {
		padding: 16,
		fontSize: 15,
		textAlign: "center"
	},
	item: {
		backgroundColor: '#fff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
	menu_icon: {
		width: 60,
		height: 60
	},
	menu_bar: {
		justifyContent: 'flex-end',
		width: '100%',
		height: '10%',
		backgroundColor: '#bababa',
	},
})
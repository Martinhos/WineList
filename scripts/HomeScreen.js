import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import query_2_db from './DB_Query.js'




export default function HomeScreen ({navigation}) {

	return (
		<View style={{flex: 1}}>
			<View style={styles.menu_bar}>
				<View style={{flex: 1, flexDirection: 'row', alignItems:'flex-end'}}>
					<TouchableOpacity onPress={() => {
						navigation.openDrawer();
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
					query_2_db('select Nome, Regiao from Vinhos order by Nome ASC')
				}}>
					<Image
					source={require('../app/assets/Wine_Bottle.jpg')}
					fadeDuration={300}
					/>						
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
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
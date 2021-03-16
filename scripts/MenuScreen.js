import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Button } from 'react-native';



export default function MenuScreen ({ navigation }) {
    return(
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
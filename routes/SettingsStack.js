import 'react-native-gesture-handler';
import React, { Component, } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../scripts/Settings';
import { MaterialIcons } from '@expo/vector-icons';


export default class SettingsStack extends Component {
    render() {

        const Stack = createStackNavigator();

        return(
            <Stack.Navigator>
                <Stack.Screen name='Settings' component={Settings} options={{
                    headerTitle: 'Definições',
                    headerTintColor: '#444',
                    headerStyle: { backgroundColor: '#eee', height: 60, },
                    headerLeft: () => (<MaterialIcons name='menu' size={28} onPress={() => {this.props.navigation.openDrawer()}} style={styles.menu_icon}/>)
                    }}
                />
            </Stack.Navigator>
        );
    };
}

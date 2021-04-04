import 'react-native-gesture-handler';
import React, { Component, } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../scripts/Settings';
import Header from '../shared/header';


export default class SettingsStack extends Component {
    render() {

        const Stack = createStackNavigator();

        return(
            <Stack.Navigator>
                <Stack.Screen name='Settings' component={Settings} /* options={{
                    header: () => {return(<Header navigation={this.props.navigation} title='Settings' />)},
                    headerTintColor: '#444',
                    headerStyle: { backgroundColor: '#000', height: 60, },
                    }} */
                />
            </Stack.Navigator>
        );
    };
}

import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../scripts/HomeScreen'
import AddWine from '../scripts/AddWineScreen'
import Header from '../shared/header';

export default class HomeStack extends Component {
    render() {

        const Stack = createStackNavigator();

        return(
            <Stack.Navigator>
                <Stack.Screen name='Home' component={HomeScreen} /* options={{
                    header: () => {return(<Header navigation={this.props.navigation} title='My Collection' />)},
                    headerTintColor: '#444',
                    headerStyle: { backgroundColor: '#000', height: 60, },
                    }} */
                />
                <Stack.Screen name='AddWine' component={AddWine} /* options={{
                    header: () => {return(<Header navigation={this.props.navigation} title='Add Wine' />)},
                    headerTintColor: '#444',
                    headerStyle: { backgroundColor: '#000', height: 60, },
                    }} */
                />
            </Stack.Navigator>
        );
    };
}
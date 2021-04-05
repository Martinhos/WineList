import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../scripts/HomeScreen'
import AddWine from '../scripts/AddWineScreen'
import { MaterialIcons } from '@expo/vector-icons';

export default class HomeStack extends Component {
    render() {

        const Stack = createStackNavigator();

        return(
            <Stack.Navigator initialRouteName='Home' headerMode='screen'>
                <Stack.Screen name='Home' component={HomeScreen} options={{
                    headerTitle: 'A Minha Coleção',
                    headerRight: () => (<MaterialIcons name='add' size={28} onPress={() => {this.props.navigation.navigate('AddWine')}} style={styles.add_icon}/>),
                    headerTintColor: '#444',
                    headerStyle: { backgroundColor: '#eee', height: 60, },
                    headerLeft: () => (<MaterialIcons name='menu' size={28} onPress={() => {this.props.navigation.openDrawer()}} style={styles.menu_icon}/>)
                    }}
                />
                <Stack.Screen name='AddWine' component={AddWine} options={{
                    headerTitle: 'Adicionar Vinho',
                    headerTintColor: '#444',
                    headerStyle: { backgroundColor: '#eee', height: 60, },
                    headerLeft: () => (<MaterialIcons name="arrow-back" size={28} style={styles.menu_icon} onPress={() => {this.props.navigation.navigate('Home')}} />),
                    }}
                />
            </Stack.Navigator>
        );
    };
}
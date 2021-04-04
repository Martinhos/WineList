import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ImageBackground, Button } from 'react-native';
import styles from '../app/config/colors.js'
import { MaterialIcons } from '@expo/vector-icons';


export default class Header extends Component {
    render() {

        const openMenu = () => {
            this.props.navigation.openDrawer()
        };

        const AddWine = () => {
            this.props.navigation.navigate('AddWine')
        };

        return (
        
            <View style={styles.header}>
                <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.menu_icon}/>
                <View>
                    <Text style={styles.header_text}>{this.props.title}</Text>
                </View>
                <MaterialIcons name='add' size={28} onPress={AddWine} style={styles.add_icon}/>
            </View>

        );
    };
}
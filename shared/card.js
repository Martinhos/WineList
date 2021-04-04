import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ImageBackground, Button } from 'react-native';
import styles from '../app/config/colors.js'
import { MaterialIcons } from '@expo/vector-icons';

export default class Card extends Component {
    render() {
        return(
            <View style={[styles.card, this.props.style]}>
                <View style={styles.card_content}>
                    {this.props.children}
                </View>
            </View>
        );
    };
}
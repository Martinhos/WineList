import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ImageBackground, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import styles from '../app/config/colors.js'



export default class MyCollection extends Component {
    state = {
        selectedId: null,
    }

    update() {
        const db = SQLite.openDatabase('Lista_Vinhos.db');
		db.transaction((tx) => {
			tx.executeSql('SELECT * FROM Vinhos'/*'DELETE from Vinhos where ID == 3'*/, [], (_, ResultSet) => {
				//console.log(this.state);
				this.setState({items: ResultSet.rows._array});
				//console.log(this.props.route);
			}, (tx, error) => {
				console.log(error)
			});
		}, (error) => {
			console.log(error)
		}, () => {
			//this.render()
		});
    }

    componentDidMount() {
		this.update();
	}

    render() {

        const Vinho = ({ item, onPress, style }) => (
            <TouchableOpacity
            onPress={onPress}
            style={[styles.item, style]}>
                <Text style={styles.title}>{item.Nome}</Text>
            </TouchableOpacity>
        );

        const renderItem = ({item}) => {
            const backgroundColor = item.ID === this.state.selectedId ? "#804c36" : "#caa472";

            return(
                <Vinho
                    item={item}
                    onPress={() => {
                        this.state.selectedId === item.ID ? this.setState({selectedId: null}) : this.setState({selectedId: item.ID})
                    }}
                    style={{backgroundColor}}
                />
            )
        };

        return(
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
                            <FlatList
                                data={this.state.items}
                                renderItem={renderItem}
                                keyExtractor={item => item.ID.toString()}
                                extraData={this.state.selectedId}
                            />
                            <Button
                            title={'Update'}
                            onPress={() => this.update()}
                            />
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
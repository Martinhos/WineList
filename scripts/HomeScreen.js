import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Modal, Alert, RefreshControl } from 'react-native';
import { BlurView } from 'expo-blur';
import * as SQLite from 'expo-sqlite';
import styles from '../app/config/colors'
import Card from '../shared/card';
import { MaterialIcons } from '@expo/vector-icons';



export default class HomeScreen extends Component {
    state = {
        modal_opened: false,
        refreshing: false,
        selectedItem: null,
        items: null,
    }

    update() {
        const db = SQLite.openDatabase('Lista_Vinhos.db');
		db.transaction((tx) => {
            this.setState({refreshing: true})
			tx.executeSql('SELECT * FROM Vinhos'/*'DELETE from Vinhos where ID == 3'*/, [], (_, ResultSet) => {
				//console.log(ResultSet.rows._array.length);
                if (ResultSet.rows._array.length !== 0) {
				    this.setState({items: ResultSet.rows._array});
                }
                //console.log(this.state.items)
                this.setState({refreshing: false})
				//console.log(this.props.route);
			}, (tx, error) => {
                this.setState({refreshing: false})
                Alert.alert(
                    'Error!',
                    'Could not Query to Database',
                    [
                        {
                            text: 'OK',
                        }
                    ]
                );
			});
		}, (error) => {
            this.setState({refreshing: false})
			Alert.alert(
                'Error!',
                'Could not open Database',
                [
                    {
                        text: 'OK',
                    }
                ]
            );
		}, () => {
			//this.render()
		});
    }

    componentDidMount() {
		this.update();
	}

    render() {

        const Vinho = ({ item, onPress }) => (
            <TouchableOpacity
                onPress={onPress}
            >
                <Card>
                    <Text style={styles.title}>{item.Nome}</Text>
                    <MaterialIcons name="more-vert" size={24} color="black" onPress={() => {console.log('More Info')}} style={styles.more_icon}/>
                </Card>
            </TouchableOpacity>
        );

        const renderItem = ({item}) => {

            return(
                <Vinho
                    item={item}
                    onPress={() => {this.setState({modal_opened: true}); this.setState({selectedItem: item})}}
                />
            )
        };

        return(
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <Modal
                        visible={this.state.modal_opened}
                        animationType='slide' 
                        transparent={true}
                    >
                        <BlurView tint='light' intensity={120} style={styles.modal}>
                            <Card style={styles.modal_content}>
                                <View>
                                    <MaterialIcons size={28} name='close' onPress={() => {this.setState({modal_opened: false}); this.setState({selectedItem: null})}} style={styles.close_icon}/>
                                    <ScrollView>
                                        <Card>
                                            <Text>ID: {this.state.selectedItem === null ? '' : this.state.selectedItem.ID}</Text>
                                            <Text>Nome: {this.state.selectedItem === null ? '' : this.state.selectedItem.Nome}</Text>
                                        </Card>
                                    </ScrollView>
                                </View>
                            </Card>
                        </BlurView>
                    </Modal>
                    {this.state.items === null ? (
                        <ScrollView
                        refreshControl={
                          <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {this.update()}}
                          />
                        }
                      >
                        <Text>You don't have any Wines Saved</Text>
                      </ScrollView>
                    ) : (
                        <FlatList
                        data={this.state.items}
                        renderItem={renderItem}
                        keyExtractor={item => item.ID.toString()}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.update();
                        }}
                    />
                    )}
                </View>
            </View>
        );
    }
}
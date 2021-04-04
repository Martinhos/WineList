import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, DevSettings, TouchableOpacity, FlatList, ScrollView, Modal, Alert, Button } from 'react-native';
import { BlurView } from 'expo-blur';
import * as SQLite from 'expo-sqlite';
import styles from '../app/config/colors'
import Card from '../shared/card';
import { MaterialIcons } from '@expo/vector-icons';


export default class Settings extends Component {

    state = {
        error: false,
    };

    render() {

        const confirmDelete = () => {
            Alert.alert('Are you sure?', 'Are you sure you want to delete the Database? This action can not be reverted', [
                {
                    title: 'CANCEL',
                    style: 'cancel',
                },
                {
                    title: 'YES',
                    onPress: deleteDB
                },
            ])
        };

        const errorOcurred = (err) => {
            Alert.alert('Error', 'An error has ocurred while deleting the database: ' + err, [
                {
                    title: 'OK',
                    onPress: () => {DevSettings.reload()}
                },
            ])
        }

        const deleteDB = () => {
            const db = SQLite.openDatabase('Lista_Vinhos.db');
            db.transaction((tx) => {
                tx.executeSql('DROP TABLE Castas_Vinho', [], (tx, _) => {
                    if (this.state.error === false) {
                        tx.executeSql('DROP TABLE Castas', [], (tx, _) => {
                            if (this.state.error === false) {
                                tx.executeSql('DROP TABLE Enologos_vinho', [], (tx, _) => {
                                    if (this.state.error === false) {
                                        tx.executeSql('DROP TABLE Enologos', [], (tx, _) => {
                                            if (this.state.error === false) {
                                                tx.executeSql('DROP TABLE Subnomes_vinhos', [], (tx, _) => {
                                                    if (this.state.error === false) {
                                                        tx.executeSql('DROP TABLE Subnomes', [], (tx, _) => {
                                                            if (this.state.error === false) {
                                                                tx.executeSql('DROP TABLE Produtor_Vinho', [], (tx, _) => {
                                                                    if (this.state.error === false) {
                                                                        tx.executeSql('DROP TABLE Produtor', [], (tx, _) => {
                                                                            if (this.state.error === false) {
                                                                                tx.executeSql('DROP TABLE Vinhos', [], (tx, _) => {
                                                                                    Alert.alert('Success', 'The Database has been successfuly deleted', [
                                                                                        {
                                                                                            title: 'OK',
                                                                                            onPress: () => {DevSettings.reload()}
                                                                                        }
                                                                                    ]);
                                                                                }, (_, err) => {
                                                                                    this.setState({ error: true });
                                                                                    errorOcurred(err);
                                                                                });
                                                                            }
                                                                        }, (_, err) => {
                                                                            this.setState({ error: true });
                                                                            errorOcurred(err);
                                                                        });
                                                                    }
                                                                }, (_, err) => {
                                                                    this.setState({ error: true });
                                                                    errorOcurred(err);
                                                                });
                                                            }
                                                        }, (_, err) => {
                                                            this.setState({ error: true });
                                                            errorOcurred(err);
                                                        });
                                                    }
                                                }, (_, err) => {
                                                    this.setState({ error: true });
                                                    errorOcurred(err);
                                                });
                                            }
                                        }, (_, err) => {
                                            this.setState({ error: true });
                                            errorOcurred(err);
                                        });
                                    }
                                }, (_, err) => {
                                    this.setState({ error: true });
                                    errorOcurred(err);
                                });
                            }
                        }, (_, err) => {
                            this.setState({ error: true });
                            errorOcurred(err);
                        });
                    }
                }, (_, err) => {
                    this.setState({ error: true });
                    errorOcurred(err);
                });
            }, (error) => {
                errorOcurred(error);
            }, () => {
            });
        }

        return(
        <View>
            <Button title='Delete DB' onPress={confirmDelete}/>
        </View>
        )
    }
}
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Alert, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import RNRestart from 'react-native-restart';


export default class Settings extends Component {

    state = {
        error: false,
    };

    render() {

        const confirmDelete = () => {
            Alert.alert('Are you sure?', 'Are you sure you want to delete the Database? This action can not be reverted', [
                {
                    text: 'CANCEL',
                    style: 'cancel',
                },
                {
                    text: 'YES',
                    onPress: deleteDB
                },
            ])
        };

        const errorOcurred = (err) => {
            Alert.alert('Error', 'An error has ocurred while deleting the database: ' + err + '. Please restart the App.', [
                {
                    text: 'OK',
                },
            ])
        }

        const deleteDB = () => {
            const db = SQLite.openDatabase('Lista_Vinhos.db');
            db.transaction((tx) => {
                tx.executeSql('DROP TABLE IF EXISTS Castas_Vinho', [], (tx, _) => {
                    if (this.state.error === false) {
                        tx.executeSql('DROP TABLE IF EXISTS Castas', [], (tx, _) => {
                            if (this.state.error === false) {
                                tx.executeSql('DROP TABLE IF EXISTS Enologos_vinho', [], (tx, _) => {
                                    if (this.state.error === false) {
                                        tx.executeSql('DROP TABLE IF EXISTS Enologos', [], (tx, _) => {
                                            if (this.state.error === false) {
                                                tx.executeSql('DROP TABLE IF EXISTS Subnomes_vinhos', [], (tx, _) => {
                                                    if (this.state.error === false) {
                                                        tx.executeSql('DROP TABLE IF EXISTS Subnomes', [], (tx, _) => {
                                                            if (this.state.error === false) {
                                                                tx.executeSql('DROP TABLE IF EXISTS Produtor_Vinho', [], (tx, _) => {
                                                                    if (this.state.error === false) {
                                                                        tx.executeSql('DROP TABLE IF EXISTS Produtor', [], (tx, _) => {
                                                                            if (this.state.error === false) {
                                                                                tx.executeSql('DROP TABLE IF EXISTS Vinhos', [], (tx, _) => {
                                                                                    Alert.alert('Success', 'The Database has been successfuly deleted. Please restart the App', [
                                                                                        {
                                                                                            text: 'OK',
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
            <Button title='Apagar Todos os Registos' onPress={confirmDelete}/>
        </View>
        )
    }
}
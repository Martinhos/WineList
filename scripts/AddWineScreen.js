import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Modal, FlatList, Alert, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import globalstyles from '../app/config/colors.js'
import {Keyboard} from 'react-native'
import Card from '../shared/card'
import { MaterialIcons } from '@expo/vector-icons';



export default class AddWine extends Component {
    state = {
        nome: null,
        Regiao: null,
        ano: null,
        Tipo: null,
        aval: null,
        periodo_i: null,
        periodo_f: null,
        foto: null,
        preco: null,
        alcool: null,
        modal_opened: false,
        selectedProperty: null,
    };

    updateModal(query) {
        {
            const db = SQLite.openDatabase('Lista_Vinhos.db');
            db.transaction((tx) => {
                tx.executeSql(query, [], (_, ResultSet) => {
                    //console.log(ResultSet.rows._array.length);
                    if (ResultSet.rows._array.length !== 0) {
                        console.log(ResultSet.rows._array)
                        this.setState({items: ResultSet.rows._array});
                    }
                    //console.log(this.state.items)
                    //console.log(this.props.route);
                }, (tx, error) => {
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
    }

    render() {

        const Item = ({item, onPress}) => (
            <TouchableWithoutFeedback
                onPress={onPress}
            >
                <Text style={styles.table_element}>{item[this.state.selectedProperty]}</Text>
            </TouchableWithoutFeedback>
        );

        const renderItem = ({item}) => {

            return(
                <Item
                    item={item}
                    onPress={() => {this.setState({[this.state.selectedProperty]: item[this.state.selectedProperty]}); this.setState({modal_opened: false})}}
                />
            )
        };

        return(
            <View style={{flex:1}}>
                <Modal
                    visible={this.state.modal_opened}
                    animationType='slide' 
                    transparent={false}
                >
                    <View>
                        <View style={styles.modal_header}>
                            <MaterialIcons size={28} name='close' onPress={() => {this.setState({modal_opened: false}); this.setState({selectedProperty: null})}} style={styles.close_icon}/>
                            <Text style={styles.modal_header_title}>{this.state.selectedProperty === null ? '' : this.state.selectedProperty}</Text>
                        </View>
                        <View style={{width: '90%', alignSelf: 'center'}}>
                            <View style={{marginTop: 25, width:'100%'}}>
                                <Text style={styles.table_header} >{this.state.selectedProperty}</Text>
                                <FlatList
                                    data={this.state.items}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.ID.toString()}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={globalstyles.container}>
                        <ScrollView>
                            <Text style={styles.sectionTitle}>Vinho</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(value) => {
                                    this.state.nome = value;
                                }}
                                value={this.state.nome}
                                placeholder='Nome do Vinho'
                                keyboardType='default'
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(value) => {
                                    this.state.ano = value;
                                }}
                                value={this.state.ano}
                                placeholder='Ano de Produção'
                                keyboardType='numeric'
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(value) => {
                                    this.state.aval = value;
                                }}
                                value={this.state.aval}
                                placeholder='Avaliação do Vinho'
                                keyboardType='numeric'
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(value) => {
                                    this.state.periodo_i = value;
                                }}
                                value={this.state.periodo_i}
                                placeholder='Período Ideal de Consumo - Inicial'
                                keyboardType='numeric'
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(value) => {
                                    this.state.periodo_f = value;
                                }}
                                value={this.state.periodo_f}
                                placeholder='Período Ideal de Consumo - Final'
                                keyboardType='default'
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(value) => {
                                    this.state.preco = value;
                                }}
                                value={this.state.preco}
                                placeholder='Preço do Vinho'
                                keyboardType='numeric'
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(value) => {
                                    this.state.alcool = value;
                                }}
                                value={this.state.alcool}
                                placeholder='Graduação Alcoólica'
                                keyboardType='numeric'
                            />
                            <View>
                                <View style={{flexDirection: 'row',}}>
                                    <Text style={styles.label}>Região</Text>
                                    {this.state.Regiao === null ? (
                                        <TouchableOpacity style={{width: '55%'}} onPress={() => {this.setState({modal_opened: true}); this.setState({selectedProperty: 'Regiao'}); this.updateModal('SELECT DISTINCT Regiao, ID FROM Vinhos')}}>
                                            <Card>
                                                <Text>Adicionar Região</Text>
                                            </Card>
                                        </TouchableOpacity>
                                    ) : (
                                        <Text style={styles.propertyText}>{this.state.Regiao}</Text>
                                    )}
                                </View>
                                <View style={{flexDirection: 'row',}}>
                                    <Text style={styles.label}>Tipo de Vinho</Text>
                                    {this.state.Tipo === null ? (
                                        <TouchableOpacity style={{width: '55%'}} onPress={() => {this.setState({modal_opened: true}); this.setState({selectedProperty: 'Tipo'}); this.updateModal('SELECT DISTINCT Tipo, ID FROM Vinhos')}}>
                                            <Card>
                                                <Text style={{fontSize: 12}}>Adicionar Tipo de Vinho</Text>
                                            </Card>
                                        </TouchableOpacity>
                                    ) : (
                                        <Text style={styles.propertyText}>{this.state.Tipo}</Text>
                                    )}
                                </View>
                            </View>
                        </ScrollView>
                        <Button
                            title='Submit'
                            onPress={() => {
                                const db = SQLite.openDatabase('Lista_Vinhos.db');
                                db.transaction(async (tx) => {
                                    tx.executeSql('insert into Vinhos (Regiao, Nome, Ano, Tipo, Aval, Periodo_i, Periodo_f, Foto, Preco, Alcool) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [this.state.Regiao, this.state.nome, this.state.ano, this.state.Tipo, this.state.aval, this.state.periodo_i, this.state.periodo_f, this.state.foto, this.state.preco, this.state.alcool], (_, ResultSet) => {
                                        Alert.alert('Insert Successful', 'The wine has been successfully inserted into the database', [
                                            {
                                                text: 'OK',
                                            },
                                        ]);
                                        this.props.navigation.goBack();
                                    }, (tx, error) => {
                                        console.log(error);
                                    });
                                    /*tx.executeSql('SELECT * from Vinhos', [], (_, results) => {
                                        console.log(results);
                                    }, (_, err) => {
                                        console.log(err);
                                    });*/
                                }, (error) => {
                                    console.log(error)
                                }, () => {
                                    //Collection.update();
                                });
                            }}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    };
}

const styles = StyleSheet.create({
	close_icon: {
		position: 'absolute',
		left: 15,
        top: 5,
	},
	input: {
        borderWidth: 1,
		borderColor: '#ddd',
		padding: 10,
		fontSize: 18,
		borderRadius: 6,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 10,
    },
    label: {
		padding: 10,
		fontSize: 18,
        width: '45%'
    },
    modal_header: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 5, },
		shadowOpacity: 1,
		shadowRadius: 2,
		elevation: 3,
		backgroundColor: '#fff',
    },
    modal_header_title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    propertyText: {
        width: '55%',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderWidth: 1,
		borderColor: '#ddd',
		padding: 10,
		fontSize: 18,
		borderRadius: 6,
    },
    table_element: {
        fontSize: 18,
        padding: 10,
        width: '100%',
        borderTopColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        alignSelf: 'center',
    },
    table_header: {
        fontSize: 18,
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        width:'100%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
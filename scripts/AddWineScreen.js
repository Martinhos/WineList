import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import globalstyles from '../app/config/colors.js'
import {Keyboard} from 'react-native'
import Card from '../shared/card'



export default class AddWine extends Component {
    state = {
        nome: null,
        regiao: null,
        ano: null,
        tipo: null,
        aval: null,
        periodo_i: null,
        periodo_f: null,
        foto: null,
        preco: null,
        alcool: null,
    };

    render() {

        return(
            <View style={{flex:1}}>
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
                            <View>
                                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                    <Text style={styles.label}>Região</Text>
                                    {this.state.regiao === null ? (
                                        <TouchableOpacity>
                                            <Card>
                                                <Text>Adicionar Região</Text>
                                            </Card>
                                        </TouchableOpacity>
                                    ) : (
                                        <Text>{this.state.regiao}</Text>
                                    )}
                                </View>
                            </View>
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
                                    this.state.tipo = value;
                                }}
                                value={this.state.tipo}
                                placeholder='Tipo de  Vinho'
                                keyboardType='default'
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
                                placeholder='Período Ideal de Consumo - Inicial'
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
                        </ScrollView>
                        <Button
                            title='Submit'
                            onPress={() => {
                                const db = SQLite.openDatabase('Lista_Vinhos.db');
                                db.transaction(async (tx) => {
                                    tx.executeSql('insert into Vinhos (Regiao, Nome, Ano, Tipo, Aval, Periodo_i, Periodo_f, Foto, Preco, Alcool) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [this.state.regiao, this.state.nome, this.state.ano, this.state.tipo, this.state.aval, this.state.periodo_i, this.state.periodo_f, this.state.foto, this.state.preco, this.state.alcool], (_, ResultSet) => {
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
});
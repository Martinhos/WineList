import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import { View, TextInput, Button, Alert, ScrollView, TouchableWithoutFeedback } from 'react-native';
import * as SQLite from 'expo-sqlite';
import styles from '../app/config/colors.js'
import { Feather } from '@expo/vector-icons';
import {Keyboard} from 'react-native'



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

        const addwine = (review) => {
            
        };

        return(
            <View style={{flex:1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <ScrollView>
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
                                    this.state.regiao = value;
                                }}
                                value={this.state.regiao}
                                placeholder='Região do Vinho'
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
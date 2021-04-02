import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import { View, TextInput, Button, Alert, ImageBackground, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { FlatList } from 'react-native-gesture-handler';
import styles from '../app/config/colors.js'
import { Feather } from '@expo/vector-icons';
//import Collection from './Collection.js'

const Inputs = [
    {
        id: 'regiao',
        title: 'Região',
        keyboard_type: 'default',
    },
    {
        id: 'nome',
        title: 'Nome',
        keyboard_type: 'default',
    },
    {
        id: 'ano',
        title: 'Ano de Produção',
        keyboard_type: 'phone-pad',
    },
    {
        id: 'tipo',
        title: 'Tipo',
        keyboard_type: 'default',
    },
    {
        id: 'aval',
        title: 'Avaliação',
        keyboard_type: 'phone-pad',
    },
    {
        id: 'periodo_i',
        title: 'Período Ideal de Consumo - Início',
        keyboard_type: 'phone-pad',
    },
    {
        id: 'periodo_f',
        title: 'Período Ideal de Consumo - Final',
        keyboard_type: 'phone-pad',
    },
    {
        id: 'foto',
        title: 'Foto_Placeholder',
        keyboard_type: 'default',
    },
    {
        id: 'preco',
        title: 'Preço',
        keyboard_type: 'phone-pad',
    },
    {
        id: 'alcool',
        title: 'Quantidade de Alcool',
        keyboard_type: 'phone-pad',
    },
];


export default class AddWine extends Component {
    state = {
        regiao: null,
        nome: null,
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

        const Input = ({ id, title, keyboard_type }) => (
            <TextInput
                style={styles.input}
                onChangeText={(value) => {
                    this.state[id] = value;
                }}
                value={this.state[id]}
                placeholder={title}
                keyboardType={keyboard_type}
                placeholderTextColor={'#fff'}
            />
        );
    
        const renderItem = ({item}) => {    
            return(
                <Input
                    id={item.id}
                    title={item.title}
                    keyboard_type={item.keyboard_type}
                />
            )
        };        


        return(
            <View style={{flex:1}}>
				<ImageBackground source={require('../app/assets/Wood_Backgroud.jpg')} style={styles.image_background}>
                    <View style={styles.menu_bar}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'flex-end'}}>
                            <Feather
								name = 'menu'
								size={55}
								onPress={() => {
									this.props.navigation.openDrawer();
								}} style={styles.menu_icon}
							/>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <ScrollView>
                            <FlatList
                                data={Inputs}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
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
                                        this.props.navigation.navigate('My Collection')
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
                </ImageBackground>
            </View>
        );
    };
}
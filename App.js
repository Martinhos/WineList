import React, { Component } from 'react';
import HomeStack from './routes/HomeStack';
import * as SQLite from 'expo-sqlite';

export default class App extends Component {

	componentDidMount() {

		//const DidCreateTable()

		const db = SQLite.openDatabase('Lista_Vinhos.db');
		
		db.transaction((tx) => {
			tx.executeSql('CREATE TABLE IF NOT EXISTS Vinhos (ID INTEGER PRIMARY KEY AUTOINCREMENT, Regiao TEXT, Nome TEXT, Ano INT, Tipo TEXT, Aval NUMERIC, Periodo_i INT, Periodo_f INT, Foto BLOB, Preco NUMERIC, Alcool NUMERIC)', [], (tx, ResultSet) => {
				tx.executeSql('CREATE TABLE IF NOT EXISTS Produtor (Produtor_ID INTEGER PRIMARY KEY AUTOINCREMENT, Produtor TEXT)', [], (tx, ResultSet) => {
					tx.executeSql('CREATE TABLE IF NOT EXISTS Produtor_Vinho (Vinho_ID INTEGER, Produtor_ID INTEGER,  FOREIGN KEY(Vinho_ID) REFERENCES Vinhos(ID),  FOREIGN KEY(Produtor_ID) REFERENCES Produtor(Produtor_ID))');
				}, (tx, err) => {});
				tx.executeSql('CREATE TABLE IF NOT EXISTS Subnomes (Subnome_ID INTEGER PRIMARY KEY AUTOINCREMENT, Subnome TEXT)', [], (tx, ResultSet) => {
					tx.executeSql('CREATE TABLE IF NOT EXISTS Subnomes_vinhos (Vinho_ID INTEGER, Subnome_ID INTEGER,  FOREIGN KEY(Vinho_ID) REFERENCES Vinhos(ID),  FOREIGN KEY(Subnome_ID) REFERENCES Subnomes(Subnome_ID))');
				}, (tx, err) => {});
				tx.executeSql('CREATE TABLE IF NOT EXISTS Enologos (Enologo_ID INTEGER PRIMARY KEY AUTOINCREMENT, Enologo_nome TEXT)', [], (tx, ResultSet) => {
					tx.executeSql('CREATE TABLE IF NOT EXISTS Enologos_vinho (Vinho_ID INTEGER, Enologo_ID INTEGER,  FOREIGN KEY(Vinho_ID) REFERENCES Vinhos(ID),  FOREIGN KEY(Enologo_ID) REFERENCES Enologo(Enologo_ID))');
				}, (tx, err) => {});
				tx.executeSql('CREATE TABLE IF NOT EXISTS Castas (Casta_ID INTEGER PRIMARY KEY AUTOINCREMENT, Nome_Casta TEXT)', [], (tx, ResultSet) => {
					tx.executeSql('CREATE TABLE IF NOT EXISTS Castas_Vinho (Vinho_ID INTEGER, Casta_ID INTEGER,  FOREIGN KEY(Vinho_ID) REFERENCES Vinhos(ID),  FOREIGN KEY(Casta_ID) REFERENCES Castas(Casta_ID))');
				}, (tx, err) => {});
			}, (tx, err) => {});
		}, (err) => {
			console.log(err)
		}, () => {
			console.log('Success!')
		});
	};

	render() {

		return (
			<HomeStack />
		);
		
	};
}
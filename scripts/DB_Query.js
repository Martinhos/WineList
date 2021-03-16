import * as SQLite from 'expo-sqlite';




export const query_2_db = (query) => {
	
	
	function Execute_success(tx, ResultSet) {
		console.log(ResultSet.rows._array)
	};

	function Execute_error(tx, error) {
		console.log('error: ' + error);
	};

	function Transaction_Error(error) {
		console.log(query + ': error: ' + error);
	};

	function Transaction_Success() {
		console.log('Success!!')
	};

	const db = SQLite.openDatabase('Lista_Vinhos.db');

	db.transaction((tx) => {
		tx.executeSql(query, [], Execute_success, Execute_error);
	}, Transaction_Error, Transaction_Success);

	//console.log(promise);

};
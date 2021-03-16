import * as SQLite from 'expo-sqlite';


export default function query_2_db(query) {

	function Execute_success(tx, ResultSet) {
		console.log(ResultSet)
	}

	function Execute_error(tx, error) {
		console.log('error: ' + error);
	}

	function Transaction_Error(error) {
		console.log(query + ': error: ' + error);
	}

	function Transaction_Success() {
		console.log('Success!!');
	}

	const db = SQLite.openDatabase('Lista_Vinhos.db');

    db.transaction((tx) => {
        tx.executeSql(query, [], Execute_success, Execute_error)
    }, Transaction_Error, Transaction_Success);

    //return query_2_db(query)

}
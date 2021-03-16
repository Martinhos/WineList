import sqlite3

def setup_connection(database_name):
	#database_name	str with database name .db
	conn = sqlite3.connect(database_name)
	c = conn.cursor()
	return c, conn

def create_table(table_name, column_names, properties, cursor, conn):
	#table_name		str with table name
	#column_names	list with columns names as str
	#properties		2D list with constraints for each column per line as str
	#cursor			cursor from setup_connection
	#conn			connection from setup_connection
	if len(column_names) != len(properties):
		raise ValueError('column_names and properties need to have the same size')
	else:
		query = 'create table if not exists ' + table_name + ' ('
		for i in range(len(column_names)):
			query += column_names[i] + ' '
			for j in range(len(properties[i])):
				query += properties[i][j] + ' '
			query = query[:-1] + ', '
		query = query[:-2] + ')'
		print(query)
		cursor.execute(query)
		conn.commit()

def insert_into_table(table_name, column_names, values, cursor, conn):
	#table_name		str with table name
	#column_names	list with columns names as str
	#values			2D list with the values for each entry per line as str
	#cursor			cursor from setup_connection
	#conn			connection from setup_connection
	for i in values:
		query = 'insert into ' + table_name + ' ( '
		for j in column_names:
			query += j + ', '
		query = query[:-2] + ' ) values ('
		for j in i:
			query += "'" + j + "'" + ', '
		query = query[:-2] + ')'
		print(query)
		cursor.execute(query)
		conn.commit()

def show_lines(table_name, cursor, conn, column_names = ['*']):
	#table_name		str with table name
	#cursor			cursor from setup_connection
	#conn			connection from setup_connection
	#column_names	list with columns to select as str. Default value as *
	if column_names == ['*']:
		query = 'select * from ' + table_name
	else:
		query = 'select ('
		for i in column_names:
			query += i + ', '
		query = query[:-2] + ') from ' + table_name
	s = cursor.execute(query)
	conn.commit()
	print(query)
	return (s.fetchall())

def remove_from_table(table_name, column, values, cursor, conn):
	#table_name		str with table name
	#column			column name from witch remove values as str
	#values			lst with values that are the condition to search for removal from table
	#cursor			cursor from setup_connection
	#conn			connection from setup_connection
	for i in values:
		query = 'delete from ' + table_name + ' where ' + column + " == '" + i + "'"
		cursor.execute(query)
		conn.commit()

def drop_tables(table_names, cursor, conn):
	#table_names	list with table names to drop from database
	#cursor			cursor from setup_connection
	#conn			connection from setup_connection
	for i in table_names:
		query = 'drop table if exists ' + i
		cursor.execute(query)
		conn.commit()
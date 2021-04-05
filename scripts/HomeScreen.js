import { TouchableOpacity as RNGHTouchableOpacity } from 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView, Modal, Alert, RefreshControl } from 'react-native';
import { BlurView } from 'expo-blur';
import * as SQLite from 'expo-sqlite';
import globalstyles from '../app/config/colors'
import Card from '../shared/card';
import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet from 'reanimated-bottom-sheet';



export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.sheetRef = React.createRef();
      }

    state = {
        modal_opened: false,
        refreshing: false,
        selectedItem: null,
        items: null,
    }

    

    update(query='SELECT * FROM Vinhos') {
        const db = SQLite.openDatabase('Lista_Vinhos.db');
		db.transaction((tx) => {
            this.setState({refreshing: true})
			tx.executeSql(query, [], (_, ResultSet) => {
				//console.log(ResultSet.rows._array.length);
                if (ResultSet.rows._array.length !== 0) {
				    this.setState({items: ResultSet.rows._array});
                }
                //console.log(this.state.items)
                this.setState({refreshing: false})
				//console.log(this.props.route);
			}, (tx, error) => {
                this.setState({refreshing: false})
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
            this.setState({refreshing: false})
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

    componentDidMount() {
		this.update();
        this.props.navigation.addListener('focus', () => {this.update()})
	}

    render() {

        const renderContent = () => (
            <View
                style={{
                    backgroundColor: 'white',
                    height: '100%',
                    padding: 16,
                }}
            >
                <RNGHTouchableOpacity onPress={() => {
                    this.sheetRef.current.snapTo(1);
                    OpenModal();
                    }}>
                    <Card>
                        <Text>Ver</Text>
                    </Card>
                </RNGHTouchableOpacity>
                <RNGHTouchableOpacity onPress={() => {
                    Alert.alert('Apagar Registo!', 'Tem a certeza de que pretende apagar este registo? Esta ação não pode ser revertida.', [
                        {
                            text: 'CANCELAR',
                        },
                        {
                            text: 'OK',
                            onPress: () => {
                                this.sheetRef.current.snapTo(1);
                                this.update('DELETE FROM Vinhos WHERE ID = ' + this.state.selectedItem.ID);
                                this.update();
                            }
                        }
                    ])
                    }}>
                    <Card>
                        <Text style={{color: 'red'}}>Apagar</Text>
                    </Card>
                </RNGHTouchableOpacity>
            </View>
        );

        const renderHeader = () => (
            <View style={styles.header} >
                <View style={styles.panelHeader}>
                    <View style={styles.panelHandle}></View>
                </View>
            </View>
        );

        const OpenModal = () => {
            this.setState({modal_opened: true});
        }


        const Vinho = ({ item, onPress }) => (
            <TouchableOpacity
                onPress={onPress}
            >
                <Card>
                    <Text style={styles.title}>{item.Nome}</Text>
                    <MaterialIcons name="more-vert" size={24} color="black" onPress={() => {this.sheetRef.current.snapTo(0); this.setState({ selectedItem: item })}} style={styles.more_icon}/>
                </Card>
            </TouchableOpacity>
        );

        const renderItem = ({item}) => {

            return(
                <Vinho
                    item={item}
                    onPress={() => {this.setState({selectedItem: item}); OpenModal()}}
                />
            )
        };

        return(
            <View style={{flex: 1}}>
                <View style={globalstyles.container}>
                    <Modal
                        visible={this.state.modal_opened}
                        animationType='slide' 
                        transparent={true}
                    >
                        <BlurView tint='light' intensity={120} style={styles.modal}>
                            <Card style={styles.modal_content}>
                                <View>
                                    <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 10}}>
                                        <MaterialIcons size={28} name='close' onPress={() => {this.setState({modal_opened: false}); this.setState({selectedItem: null})}} style={styles.close_icon}/>
                                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.selectedItem === null ? '' : this.state.selectedItem.Nome}</Text>
                                    </View>
                                    <ScrollView>
                                        <Card>
                                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Vinho</Text>
                                            <Text>Nome: {this.state.selectedItem === null ? '' : this.state.selectedItem.Nome}</Text>
                                            <Text>Região: {this.state.selectedItem === null ? '' : this.state.selectedItem.Regiao}</Text>
                                            <Text>Ano de Produção: {this.state.selectedItem === null ? '' : this.state.selectedItem.Ano}</Text>
                                            <Text>Tipo de Vinho: {this.state.selectedItem === null ? '' : this.state.selectedItem.Tipo}</Text>
                                            <Text>Avaliação: {this.state.selectedItem === null ? '' : this.state.selectedItem.Aval}</Text>
                                            <Text>Período Ideal de Consumo - Inicial: {this.state.selectedItem === null ? '' : this.state.selectedItem.Periodo_i}</Text>
                                            <Text>Período Ideal de COnsumo - Final: {this.state.selectedItem === null ? '' : this.state.selectedItem.Periodo_f}</Text>
                                            <Text>Preço: {this.state.selectedItem === null ? '' : this.state.selectedItem.Preco}</Text>
                                            <Text>Graduação Alcoólica: {this.state.selectedItem === null ? '' : this.state.selectedItem.Alcool}</Text>
                                        </Card>
                                    </ScrollView>
                                </View>
                            </Card>
                        </BlurView>
                    </Modal>
                    {this.state.items === null ? (
                        <ScrollView
                        refreshControl={
                          <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {this.update()}}
                          />
                        }
                        >
                            <Text>You don't have any Wines Saved</Text>
                        </ScrollView>
                    ) : (
                        <FlatList
                        data={this.state.items}
                        renderItem={renderItem}
                        keyExtractor={item => item.ID.toString()}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.update();
                        }}
                    />
                    )}
                </View>
                <BottomSheet
                    ref={this.sheetRef}
                    snapPoints={['50%', 0]}
                    borderRadius={10}
                    renderContent={renderContent}
                    initialSnap={1}
                    renderHeader={renderHeader}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
	close_icon: {
		position: 'absolute',
		left: 5,
	},
    header: {
        backgroundColor: '#fff',
        shadowColor: '#333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal_content: {
		justifyContent: 'flex-start',
		width: '80%',
		height: '80%',
		backgroundColor: '#fff',
	},
	more_icon: {
		position: 'absolute',
		right: 0,
	},
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelHeader: {
        alignItems: 'center',
    },
    title: {
		flex: 1,
		alignItems: 'center',
      	fontSize: 18,
	  	color: '#333',
    },
})
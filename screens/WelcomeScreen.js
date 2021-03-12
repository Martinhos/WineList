import 'react-native-gesture-handler';
import React, { useRef, useState } from 'react';
import { DrawerLayoutAndroid, StyleSheet, View, Text, Image, FlatList, TouchableHighlight, Button, Alert } from 'react-native';

const Options = [
    {
        id: 0,
        title: 'First Option',
        Behaviour: () => (
            //Alert.alert('First Option', 'First Option Selected', [
            //    {
            //        text: 'OK',
            //    },
            //    {
            //        text: 'CANCEL',
            //        style: 'cancel',
            //    },
            //]);
            <ViewImageScreen/>
        ),
    },
    {
        id: 1,
        title: 'Second Option',
        Behaviour: () => (
            <ViewImageScreen/>
        ),
    },
    {
        id: 3,
        title: 'Third Option',
        Behaviour: () => (
            <ViewImageScreen/>
        ),
    },
];

const Item = ({title, behaviour}) => (
    <View style={styles.item}>
        <Button title={title} onPress={behaviour}/>
    </View>
);

function WelcomeScreen(props) {
const renderItem = ({item}) => (
    <Item title={item.title} behaviour={item.Behaviour}/>
);

const drawer = useRef(null);

const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
        <FlatList
            data={Options}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    </View>
)

const [count, setCount] = useState(0)

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition={'left'}
            renderNavigationView={navigationView}
        >
            <View style={styles.container}>
                <TouchableHighlight onPress={() => {
                    drawer.current.openDrawer()
                }}>
                    <View style={styles.button}>
                        <Image
                            source={require('../app/assets/Wine_Bottle.jpg')}
                            fadeDuration={300}
                        />
                    </View>
                </TouchableHighlight>
            </View>
        </DrawerLayoutAndroid>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16
    },
    navigationContainer: {
        backgroundColor: "#ecf0f1"
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: "center"
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
})

export default WelcomeScreen;
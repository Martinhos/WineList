import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
    image_background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
	input: {
        height: 100,
        width: '90%',
        margin: 12,
        borderWidth: 1,
        borderColor: '#b0b0b0',
        textAlign: 'center',
        color: '#fff',
    },
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	menu_icon: {
		marginLeft: 10,
	},
	menu_bar: {
		justifyContent: 'flex-end',
		width: '100%',
		height: '10%',
		backgroundColor: '#592b17',
	},
    title: {
      fontSize: 32,
    },
})
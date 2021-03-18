import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	menu_icon: {
		width: 60,
		height: 60
	},
	menu_bar: {
		justifyContent: 'flex-end',
		width: '100%',
		height: '10%',
		backgroundColor: '#592b17',
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
    title: {
      fontSize: 32,
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
    image_background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }
})
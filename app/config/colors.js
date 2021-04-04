import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	add_icon: {
		position: 'absolute',
		right: 16,
	},
	card: {
		justifyContent: 'center',
		borderRadius: 6,
		elevation: 3,
		backgroundColor: '#fff',
		shadowOffset: { width: 1, height: 1, },
		shadowOpacity: 1,
		shadowColor: '#333',
		shadowRadius: 2,
		marginHorizontal: 4,
		marginVertical: 6,
	},
	card_content: {
		marginHorizontal: 18,
		marginVertical: 10,
	},
	close_icon: {
		paddingBottom: 10,
	},
	container: {
		flex: 1,
		padding: 20,
	},
	header: {
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	header_text: {
		fontWeight: 'bold',
		fontSize: 20,
		color: '#300',
		letterSpacing: 1,
	},
    image_background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
	input: {
        borderWidth: 1,
		borderColor: '#ddd',
		padding: 10,
		fontSize: 18,
		borderRadius: 6,
    },
	menu_icon: {
		position: 'absolute',
		left: 16,
	},
	menu_bar: {
		justifyContent: 'flex-end',
		width: '100%',
		height: '10%',
		backgroundColor: '#592b17',
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
    title: {
		flex: 1,
		alignItems: 'center',
      	fontSize: 18,
	  	color: '#333',

    },
})
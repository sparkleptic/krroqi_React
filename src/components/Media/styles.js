import { StyleSheet, PixelRatio } from 'react-native';

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#FFF8E1'
	},

	ImageContainer: {
	  borderRadius: 10,
	  width: 250,
	  height: 250,
	  borderColor: '#9B9B9B',
	  borderWidth: 1 / PixelRatio.get(),
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#92BBD9',
	  
	},
});

export default styles;

import { StyleSheet, PixelRatio, Dimensions } from 'react-native';

const length = (Dimensions.get('window').width/4)-10;

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#FFF8E1'
	},
	ImageContainer_1: {
	  borderRadius: 10,
	  width: length,
	  height: length,
	  borderColor: '#9B9B9B',
	  borderWidth: 1 / PixelRatio.get(),
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#92BBD9',
	  margin: 5,
	  marginTop: 10,
	},
	ImageContainer: {
	  borderRadius: 10,
	  width: length,
	  height: length,
	  borderColor: '#9B9B9B',
	  borderWidth: 1 / PixelRatio.get(),
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#92BBD9',
	  margin: 5,
	  marginTop: 10,
	  position: 'relative',
	},
	iconStyle: {
		position: 'absolute',
		right: 5,
		top: 5,
	}
});

export default styles;

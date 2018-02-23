import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  scrollViewParent: {
    position: 'relative',
  },
  success: {
    position: "absolute",
    zIndex: 99999,
    height: '100%',
    width: '100%',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  successViewText: {
    backgroundColor: '#fff',
    padding: 15,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  successText: {
    color: '#000',
    fontSize: 17,
    textAlign: 'center'
  },
  containerLoader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 4,
    height: 100,
    width: 100,
    marginVertical: height / 2 - 100,
    marginHorizontal: width / 2 - 50,
  },
});

export default styles;

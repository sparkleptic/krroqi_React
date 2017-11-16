import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 4,
    height: 100,
    width: 100,
    marginVertical: height / 2 - 50,
    marginHorizontal: width / 2 - 50,
  },
});

export default styles;

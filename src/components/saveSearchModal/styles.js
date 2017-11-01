import { StyleSheet, Platform, Dimensions } from 'react-native';
import { backgroundColor } from '../../constants/config';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
  },
  subContainer: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: width * 0.7,
    height: width * 0.4,
    borderRadius: 5,
    padding: 16,
  },
  textInput: {
    color: backgroundColor,
    marginTop: 10,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 4,
      },
    }),
  },
  buttonContainer: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' },
  button: { color: backgroundColor, padding: 10 },
});

export default styles;

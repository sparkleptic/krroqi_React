import { StyleSheet, Platform } from 'react-native';
import { backgroundColor } from '../../constants/config';

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    backgroundColor,
    padding: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  textInput: {
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
      },
    }),
  },
});

export default styles;

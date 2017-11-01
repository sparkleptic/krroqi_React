import { StyleSheet, Platform } from 'react-native';
import { backgroundColor } from '../../constants/config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        padding: 4,
      },
    }),
  },
  textInput: {
    flex: 1,
    color: 'white',
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#DA7A07',
        padding: 4,
        backgroundColor: '#DA7A07',
      },
    }),
  },
  button: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    padding: 10,
  },
});

export default styles;

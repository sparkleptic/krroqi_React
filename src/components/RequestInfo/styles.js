import { StyleSheet } from 'react-native';
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
});

export default styles;

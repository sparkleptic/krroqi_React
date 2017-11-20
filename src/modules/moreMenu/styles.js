import { StyleSheet } from 'react-native';
import { backgroundColor } from '../../constants/config';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  topView: { alignItems: 'center' },
  bottomView: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'gray',
    borderBottomColor: 'gray',
  },
  leftView: {
    flex: 1,
    borderRightWidth: 1,
    alignItems: 'center',
    padding: 20,
    borderColor: 'gray',
  },
  rightView: { flex: 1, padding: 20 },
  button: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: backgroundColor,
    padding: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: backgroundColor,
  },
  imageContainer: {
    height: 80,
    width: 80,

    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 12,
  },
  iconStyle: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: backgroundColor,
    margin: 12,
    paddingHorizontal: 16,
    paddingVertical: 0,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 4,
    margin: 12,
  },
});

export default styles;

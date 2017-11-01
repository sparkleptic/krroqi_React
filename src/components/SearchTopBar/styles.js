import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iosContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
  iosTextInput: {
    flex: 1,
    color: 'white',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#DA7A07',
    padding: 4,
    backgroundColor: '#DA7A07',
  },
});

export default styles;

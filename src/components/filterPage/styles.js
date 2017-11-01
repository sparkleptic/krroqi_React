import { StyleSheet, Dimensions, Platform } from 'react-native';
import { backgroundColor } from '../../constants/config';

const halfWidth = Dimensions.get('window').width / 2;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-around', backgroundColor: 'white' },
  flex: {
    flex: 1,
  },
  margin: {
    margin: 10,
  },
  padding: {
    padding: 10,
  },
  primaryBColor: {
    backgroundColor,
  },
  primaryColor: {
    color: backgroundColor,
  },
  rowSpaceBetween: { flexDirection: 'row', justifyContent: 'space-between' },
  rowCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  halfWidth: { width: halfWidth - 15 },
  divider: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    position: 'absolute',
    bottom: 10,
    left: 0,
    width: '100%',
  },
  buttonStyle: {
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  textInput: {
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'gray',
        padding: 4,
      },
    }),
  },
  label: {
    fontWeight: 'bold',
    paddingBottom: 10,
  },
});

export default styles;

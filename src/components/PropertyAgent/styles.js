import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-around', backgroundColor: 'white' },
  margin: {
    margin: 10,
  },
  divider: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    position: 'absolute',
    bottom: 10,
    left: 0,
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  mainViewHead: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainViewHeadText: {
    fontWeight: '600',
    fontSize: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default styles;

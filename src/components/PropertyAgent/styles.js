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
});

export default styles;

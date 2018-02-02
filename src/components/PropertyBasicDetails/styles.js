import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-around', backgroundColor: 'white' },
  flex: {
    flex: 1,
  },
  margin: {
    margin: 10,
  },
  textInput: {
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
    }),
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

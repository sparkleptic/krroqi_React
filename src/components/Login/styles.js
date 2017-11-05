import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    ...Platform.select({
      ios: {
        marginVertical: 30,
      },
      android: {
        marginVertical: 10,
      },
    }),
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageStyle: {
    margin: 10,
  },
  headerText: {
    margin: 10,
    alignItems: 'center',
  },
  headerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInputView: {
    marginVertical: 10,
  },
  label: {
    marginVertical: 5,
  },
  textInput: {
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
    }),
  },
  fbLoginView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  fbLoginText: {
    marginHorizontal: 5,
  },
  fbLoginIcon: {
    marginHorizontal: 5,
  },
  TCText: {
    fontSize: 12,
    fontWeight: '400',
  },
});

export default styles;

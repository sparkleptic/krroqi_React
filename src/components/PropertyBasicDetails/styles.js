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
        borderColor: '#000',
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
  datePickerBox:{
    marginTop: 5,
    borderColor: '#323232',
    borderBottomWidth: 0.5,
    padding: 0,
    height: 38,
    justifyContent:'center'
  },  
  datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '#323232',
  
  },
});

export default styles;

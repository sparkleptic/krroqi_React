import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 4,
    height: 40,
    borderWidth: 1,
    borderColor: 'green',
    borderLeftWidth: 0,
  },
  InnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: 'green',
  },
  selectedView: {
    backgroundColor: 'green',
  },
  TextStyle: {
    color: 'green',
    fontSize: 16,
    fontWeight: '400',
  },
  SelectedTextStyle: {
    color: 'white',
  },
});

export default styles;

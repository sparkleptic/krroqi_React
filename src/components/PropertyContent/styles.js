import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const HEADER_MAX_HEIGHT = 300;

const styles = StyleSheet.create({
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    margin: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginVertical: 5,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    width: width / 2,
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
  },
  subject: {
    fontSize: 22,
    marginVertical: 5,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: 'black',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 4,
  },
});

export default styles;

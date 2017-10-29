import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  wrapper: {
    height: 280,
    width: 260,
    margin: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  ProgressiveImage: {
    width: '100%',
    height: 160,
  },
  cardDetail: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '300',
    color: '#9B9B9B',
  },
  subHeader: {
    fontSize: 13,
    fontWeight: '500',
    color: 'black',
    paddingRight: 10,
  },
  displayTop: {
    position: 'absolute',
    top: 0,
  },
  propertyStatus: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    padding: 4,
  },
  propertyLabel: {
    backgroundColor: 'rgba(221, 51, 51, 1)',
    color: 'white',
    padding: 4,
  },
  priceLabel: {
    position: 'absolute',
    top: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    padding: 4,
    fontSize: 18,
    fontWeight: '500',
  },
  iconStyle: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default styles;

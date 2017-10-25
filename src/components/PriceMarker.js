import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#FF5A5F',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 3,
    borderColor: '#D23F44',
    borderWidth: 0.5,
  },
  dollar: {
    color: '#fff',
    fontSize: 10,
  },
  amount: {
    color: '#fff',
    fontSize: 13,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 4,
    borderTopColor: '#FF5A5F',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 4,
    borderTopColor: '#D23F44',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  selectedBubble: {
    backgroundColor: '#4da2ab',
    borderColor: '#007a87',
  },
  selectedArrow: {
    borderTopColor: '#4da2ab',
  },
  selectedArrowBorder: {
    borderTopColor: '#007a87',
  },
});

const PriceMarker = ({ amount, selected, style }) => {
  const background = '#FF5A5F';

  const border = '#D23F44';

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: background,
            borderColor: border,
          },
        ]}
      >
        <Text style={styles.dollar}>$</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>
      <View style={[styles.arrowBorder, { borderTopColor: border }]} />
      <View style={[styles.arrow, { borderTopColor: background }]} />
    </View>
  );
};

PriceMarker.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default PriceMarker;

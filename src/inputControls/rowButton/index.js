import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';

class ButtonRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.value,
    };
    this.selectOption = this.selectOption.bind(this);
  }

  selectOption(e, selectedValue) {
    this.setState({ selectedValue });
    this.props.onChange(e, selectedValue);
  }

  render() {
    const { selectedValue } = this.state;
    return (
      <View style={styles.Container}>
        {this.props.options.map(value => (
          <TouchableWithoutFeedback key={value} onPress={e => this.selectOption(e, value)}>
            <View
              style={
                selectedValue === value ? [styles.InnerView, styles.selectedView] : styles.InnerView
              }
            >
              <Text
                style={
                  selectedValue === value
                    ? [styles.TextStyle, styles.SelectedTextStyle]
                    : styles.TextStyle
                }
              >
                {value}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }
}

ButtonRow.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ButtonRow;

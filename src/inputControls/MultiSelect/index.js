import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelectLightBox from './multiSelectLightBox';
import { backgroundColor } from '../../constants/config';

Navigation.registerComponent('krooqi.MultiSelectLightBox', () => MultiSelectLightBox);

class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiSelectData: props.multiSelectData,
      selectedValues: props.selectedValues,
    };
    this.showLightBox = this.showLightBox.bind(this);
    this.hideLightBox = this.hideLightBox.bind(this);
    this.selectValues = this.selectValues.bind(this);
  }

  showLightBox(e) {
    e.preventDefault();
    Navigation.showLightBox({
      screen: 'krooqi.MultiSelectLightBox',
      passProps: {
        multiSelectData: this.state.multiSelectData,
        selectedValues: this.state.selectedValues,
        onSet: this.selectValues,
        onCancel: this.hideLightBox,
      },
      style: {
        backgroundBlur: 'dark',
        tapBackgroundToDismiss: true,
      },
    });
  }

  hideLightBox() {
    Navigation.dismissLightBox();
  }

  selectValues(selectedValues) {
    this.setState({ selectedValues });
    this.hideLightBox();
  }

  render() {
    const { selectedValues } = this.state;
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.showLightBox}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                flex: 1,
                borderColor: 'gray',
                borderRightWidth: 1,
                borderBottomWidth: 1,
                height: 28,
                color: backgroundColor,
              }}
            >
              {selectedValues.join(', ')}
            </Text>
            <Icon
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                borderColor: 'gray',
                borderBottomWidth: 1,
                height: 28,
              }}
              name={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'}
              size={24}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

MultiSelect.propTypes = {
  multiSelectData: PropTypes.array.isRequired,
  selectedValues: PropTypes.array.isRequired,
};

export default MultiSelect;

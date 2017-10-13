import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, CheckBox, Text } from 'react-native';

class LightBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedData: [],
    };
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }

  onChangeCheckbox(value) {}

  render() {
    const { data } = this.props;
    return (
      <View>
        <ScrollView>
          {data.map((value, index) => (
            <View>
              <Text>{value}</Text>
              <CheckBox />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

LightBox.propTypes = {
  data: PropTypes.array.isRequired,
  selectedData: PropTypes.array.isRequired,
};

export default LightBox;

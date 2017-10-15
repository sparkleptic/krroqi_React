import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { backgroundColor } from '../constants/config';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.75,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  content: {
    marginTop: 8,
  },
});

class SortModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.selectedValue,
      sortData: props.sortData,
    };
    this.selectValue = this.selectValue.bind(this);
  }

  componentWillUnmount() {
    this.props.navigator.dismissLightBox();
  }

  selectValue(data) {
    this.props.onSelect(data);
  }

  render() {
    const { selectedValue, sortData } = this.state;
    return (
      <View style={styles.container}>
        <Text
          style={{
            color: backgroundColor,
            marginBottom: 8,
          }}
        >
          Sort By
        </Text>
        <ScrollView>
          {sortData.map(data => (
            <TouchableWithoutFeedback key={data} onPress={() => this.selectValue(data)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 8,
                  paddingBottom: 8,
                }}
              >
                <Text>{data}</Text>
                {selectedValue === data ? (
                  <Icon
                    name={Platform.OS === 'ios' ? 'ios-radio-button-on' : 'md-radio-button-on'}
                    color={backgroundColor}
                    size={18}
                  />
                ) : (
                  <Icon
                    name={Platform.OS === 'ios' ? 'ios-radio-button-off' : 'md-radio-button-off'}
                    color={backgroundColor}
                    size={18}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </View>
    );
  }
}

SortModal.propTypes = {
  sortData: PropTypes.array,
  selectedValue: PropTypes.string,
  navigator: PropTypes.object,
  onSelect: PropTypes.func,
};

SortModal.defaultProps = {
  sortData: [],
  selectedValue: '',
  navigator: {},
  onSelect: null,
};

export default SortModal;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  CheckBox,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { backgroundColor } from '../../constants/config';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.7,
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

class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: props.selectedValues,
      multiSelectData: props.multiSelectData,
    };
    this.selectValue = this.selectValue.bind(this);
    this.onSet = this.onSet.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedValues: nextProps.selectedValues,
    });
  }

  onCancel() {
    this.props.onCancel();
  }

  onSet() {
    this.props.onSet(this.state.selectedValues);
  }

  onSelectAll() {
    this.setState({ selectedValues: [] });
  }

  selectValue(data) {
    const { selectedValues } = this.state;
    let newValues = [];
    if (selectedValues.find(item => item.key === data.key)) {
      newValues = selectedValues.filter(item => item.key !== data.key);
    } else {
      newValues = [...selectedValues, data];
    }
    this.setState({ selectedValues: newValues });
  }

  render() {
    const { selectedValues, multiSelectData } = this.state;
    let scrollHeight = 50 + multiSelectData.length * 40;
    if (scrollHeight > 320) {
      scrollHeight = 320;
    }

    return (
      <View style={styles.container}>
        <Text
          style={{
            color: backgroundColor,
            marginBottom: 8,
          }}
        >
          Select Property Types
        </Text>
        <ScrollView style={{ height: scrollHeight }}>
          <TouchableOpacity onPress={this.onSelectAll}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 8,
              }}
            >
              <Text>All</Text>
              <CheckBox value={selectedValues.length === 0} />
            </View>
          </TouchableOpacity>
          {multiSelectData.map(data => (
            <TouchableOpacity key={data.key} onPress={() => this.selectValue(data)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 8,
                }}
              >
                <Text>{data.value}</Text>
                <CheckBox value={selectedValues.some(item => item.key === data.key)} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={this.onCancel}>
            <View>
              <Text style={{ color: backgroundColor, padding: 10 }}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onSet}>
            <View>
              <Text style={{ color: backgroundColor, padding: 10 }}>Set</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

MultiSelect.propTypes = {
  multiSelectData: PropTypes.array,
  selectedValues: PropTypes.array,
  onSet: PropTypes.func,
  onCancel: PropTypes.func,
};

MultiSelect.defaultProps = {
  multiSelectData: [],
  selectedValues: [],
  onSet: null,
  onCancel: null,
};

export default MultiSelect;

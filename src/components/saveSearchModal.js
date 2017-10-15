import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { backgroundColor } from '../constants/config';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.3,
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

class SaveSearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveSearchText: props.defaultSearchLabel,
    };
    this.onSaveSearch = this.onSaveSearch.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onSaveSearch() {
    this.props.onSaveSearch(this.state.saveSearchText);
  }

  onCancel() {
    this.props.onCancel();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={styles.container}>
          <Text>Enter Search Name</Text>
          <TextInput
            style={{
              flex: 1,
              color: backgroundColor,
            }}
            value={this.state.saveSearchText}
            onChangeText={saveSearchText => this.setState({ saveSearchText })}
            onSubmitEditing={this.onSave}
            underlineColorAndroid={backgroundColor}
            selectionColor={backgroundColor}
            autoFocus
          />
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableWithoutFeedback onPress={this.onCancel}>
              <View>
                <Text style={{ color: backgroundColor, padding: 10 }}>Cancel</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.onSaveSearch}>
              <View>
                <Text style={{ color: backgroundColor, padding: 10 }}>Ok</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}

SaveSearchModal.propTypes = {
  defaultSearchLabel: PropTypes.string.isRequired,
  onSaveSearch: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default SaveSearchModal;

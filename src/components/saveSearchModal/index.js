import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
// import Icon from 'react-native-vector-icons/Ionicons';
import { backgroundColor } from '../../constants/config';
import styles from './styles';

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
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback style={styles.fill} onPress={() => Navigation.dismissLightBox()}>
          <View style={styles.fill} />
        </TouchableWithoutFeedback>
        <View style={styles.subContainer}>
          <Text>Enter Search Name</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.saveSearchText}
            onChangeText={saveSearchText => this.setState({ saveSearchText })}
            onSubmitEditing={this.onSave}
          />
          <View style={styles.buttonContainer}>
            <TouchableWithoutFeedback onPress={this.onCancel}>
              <View>
                <Text style={styles.button}>Cancel</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.onSaveSearch}>
              <View>
                <Text style={styles.button}>Ok</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

SaveSearchModal.propTypes = {
  defaultSearchLabel: PropTypes.string,
  onSaveSearch: PropTypes.func,
  onCancel: PropTypes.func,
};

SaveSearchModal.defaultProps = {
  defaultSearchLabel: '',
  onSaveSearch: null,
  onCancel: null,
};

export default SaveSearchModal;

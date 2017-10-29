import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
// import Icon from 'react-native-vector-icons/Ionicons';
import { backgroundColor } from '../../constants/config';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
  },
  subContainer: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.4,
    borderRadius: 5,
    padding: 16,
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
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback style={styles.fill} onPress={() => Navigation.dismissLightBox()}>
          <View style={styles.fill} />
        </TouchableWithoutFeedback>
        <View style={styles.subContainer}>
          <Text>Enter Search Name</Text>
          <TextInput
            style={{
              flex: 1,
              color: backgroundColor,
            }}
            value={this.state.saveSearchText}
            onChangeText={saveSearchText => this.setState({ saveSearchText })}
            onSubmitEditing={this.onSave}
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

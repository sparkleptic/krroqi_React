import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './styles';

class PropertyTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      name: '',
      phone: '',
    };
  }

  render() {
    const {
      title, description, name, phone,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.mainViewHead}><Text style={styles.mainViewHeadText}> Title </Text></View>
        <ScrollView style={styles.flex}>
          <KeyboardAvoidingView style={styles.flex} behavior="padding">
            <View style={styles.margin}>
              <Text style={styles.label}>Property Title</Text>
              <TextInput
                style={styles.textInput}
                value={title}
                placeholder="Property Title"
                onChangeText={txt => this.setState({ title: txt })}
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Prooperty Description</Text>
              <TextInput
                style={styles.textInput}
                value={description}
                placeholder="Prooperty Description"
                onChangeText={txt => this.setState({ description: txt })}
                numberOfLines={4}
                maxHeight={100}
                multiline
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Owner Name</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                placeholder="Owner Name"
                onChangeText={txt => this.setState({ name: txt })}
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Owner Phone #</Text>
              <TextInput
                style={styles.textInput}
                value={phone}
                placeholder="Owner Phone"
                onChangeText={txt => this.setState({ phone: txt })}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

PropertyTitle.propTypes = {};

export default PropertyTitle;

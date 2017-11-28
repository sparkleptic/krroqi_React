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
        <ScrollView style={styles.flex}>
          <KeyboardAvoidingView style={styles.flex} behavior="padding">
            <View style={styles.margin}>
              <Text style={styles.label}>Unit / Floor</Text>
              <TextInput
                style={styles.textInput}
                value={title}
                placeholder="Unit / Floor"
                onChangeText={txt => this.setState({ title: txt })}
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Unit / Floor</Text>
              <TextInput
                style={styles.textInput}
                value={description}
                placeholder="Unit / Floor"
                onChangeText={txt => this.setState({ description: txt })}
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Unit / Floor</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                placeholder="Unit / Floor"
                onChangeText={txt => this.setState({ name: txt })}
                numberOfLines={4}
                maxHeight={100}
                multiline
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Unit / Floor</Text>
              <TextInput
                style={styles.textInput}
                value={phone}
                placeholder="Unit / Floor"
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

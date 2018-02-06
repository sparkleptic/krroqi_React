import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux'
import { 
updatePropertyTitle,
updatePropertyDescription,
updateOwnerName,
updateOwnerPhone,
} from '../../Actions/propertyPostAction'

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

  propertyTitleUpdate = (titleUpdate) => {
    this.setState({ title: titleUpdate })
    this.props.updatePropertyTitle(titleUpdate)
  }

  propertyDescriptionUpdate = (descriptionUpdate) => {
    this.setState({ description: descriptionUpdate })
    this.props.updatePropertyDescription(descriptionUpdate)
  }

  ownerNameUpdate = (ownerName) => {
    this.setState({ name: ownerName })
    this.props.updateOwnerName(ownerName)
  }

  ownerPhoneUpdate = (ownerPhone) => {
    // let newText = '';
    // let numbers = '0123456789';

    // for (var i = 0; i < ownerPhone.length; i++) {
    //     if ( numbers.indexOf(ownerPhone[i]) > -1 ) {
    //         newText = newText + ownerPhone[i];
    //     }
    // } 
    
    // this.setState({ phone: newText })
    // this.props.updateOwnerPhone(newText) 
       
    this.setState({ phone: ownerPhone })
    this.props.updateOwnerPhone(ownerPhone)
  }

  render() {
    const {
      title, description, name, phone,
    } = this.state;
    const { propertyTitle, propertyDescription, ownerName, ownerPhone, screen_2 } = this.props.propertyPost;
    return (
      <View style={styles.container}>
        <View style={styles.mainViewHead}><Text style={styles.mainViewHeadText}> Title </Text></View>
        <ScrollView style={styles.flex}>
          <KeyboardAvoidingView style={styles.flex} behavior="padding">
            {
              screen_2 ? <Text style={{color: 'red', fontWeight: '600'}}>Fill All Fields</Text> : null
            }
            <View style={styles.margin}>
              <Text style={styles.label}>Property Title</Text>
              <TextInput
                style={styles.textInput}
                value={title}
                placeholder="Property Title"
                onChangeText={txt => this.propertyTitleUpdate(txt)}
              />
              <Text>propertyTitle : = {propertyTitle}</Text>
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Prooperty Description</Text>
              <TextInput
                style={styles.textInput}
                value={description}
                placeholder="Prooperty Description"
                onChangeText={txt => this.propertyDescriptionUpdate(txt) }
                numberOfLines={4}
                maxHeight={100}
                multiline
              />
              <Text>propertyDescription : = {propertyDescription}</Text>
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Owner Name</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                placeholder="Owner Name"
                onChangeText={txt => this.ownerNameUpdate(txt)}
              />
              <Text>ownerName : = {ownerName}</Text>
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Owner Phone #</Text>
              <TextInput
                style={styles.textInput}
                value={phone}
                placeholder="Owner Phone"
                keyboardType={'numeric'}
                onChangeText={txt => this.ownerPhoneUpdate(txt)}
              />
              <Text>ownerPhone : = {ownerPhone}</Text>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

PropertyTitle.propTypes = {};

function mapStateToProps (state) {
  return {
    propertyPost: state.propertyPost,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePropertyTitle: (value) => dispatch(updatePropertyTitle(value)),
    updatePropertyDescription: (value) => dispatch(updatePropertyDescription(value)),
    updateOwnerName: (value) => dispatch(updateOwnerName(value)),
    updateOwnerPhone: (value) => dispatch(updateOwnerPhone(value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyTitle)

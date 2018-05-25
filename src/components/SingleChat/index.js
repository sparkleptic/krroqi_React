import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, FlatList, Text, TouchableHighlight, Platform } from 'react-native';
import { krooqi_URL, backgroundColor } from "../../constants/config";
import axios from "axios";
import styles from './styles';
import I18n from '../../i18n';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

class SingleChat extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        this.props.navigator.dismissModal({
          animationType: 'slide-down',
        });
      }
    }
  }

  render() {

    const { item } = this.props;

    return (
      <View style={styles.mainView}>
          { 
            item.email !== null && item.email !== "" && item.email !== undefined && 
            <Text style={[styles.mainText, Platform.OS === "ios" ? {textAlign: "right", justifyContent: "flex-end"} :{}]}><Text style={styles.boldWords}>{I18n.t('chat_Email').toProperCase()} : </Text>{item.email}</Text>
          }
          { 
            item.name !== null && item.name !== "" && item.name !== undefined && 
            <Text style={[styles.mainText, Platform.OS === "ios" ? {textAlign: "right", justifyContent: "flex-end"} :{}]}><Text style={styles.boldWords}>{I18n.t('chat_Name').toProperCase()} : </Text>{item.name}</Text>
          }
          { 
            item.phone !== null && item.phone !== "" && item.phone !== undefined && 
            <Text style={[styles.mainText, Platform.OS === "ios" ? {textAlign: "right", justifyContent: "flex-end"} :{}]}><Text style={styles.boldWords}>{I18n.t('chat_Phone').toProperCase()} : </Text>{item.phone}</Text>
          }
          { 
            item.message !== null && item.message !== "" && item.message !== undefined && 
            <Text style={[styles.mainText, Platform.OS === "ios" ? {textAlign: "right", justifyContent: "flex-end"} :{}]}><Text style={styles.boldWords}>{I18n.t('chat_Message').toProperCase()} : </Text>{item.message}</Text>
          }
          { 
            item.property_name !== null && item.property_name !== "" && item.property_name !== undefined && 
            <Text style={[styles.mainText, Platform.OS === "ios" ? {textAlign: "right", justifyContent: "flex-end"} :{}]}><Text style={styles.boldWords}>{I18n.t('chat_Property').toProperCase()} : </Text>{item.property_name}</Text>
          }
        </View>
    );
  }
}

SingleChat.propTypes = {
  item: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(SingleChat);

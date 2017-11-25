import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as AuthAction from '../../Actions/AuthAction';
import styles from './styles';
import { backgroundColor } from '../../constants/config';

class More extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openLogin = this.openLogin.bind(this);
    this.openPostProperty = this.openPostProperty.bind(this);
    this.openFindAgent = this.openFindAgent.bind(this);
  }

  openLogin() {
    const { auth } = this.props;
    if (auth.success) {
      this.props.actions.logout();
    } else {
      this.props.navigator.showModal({
        screen: 'krooqi.Login',
        passProps: {
          label: 'to save a home',
        },
        navigatorStyle: {
          navBarHidden: true,
          screenBackgroundColor: 'white',
        },
        animationType: 'slide-up',
      });
    }
  }

  openPostProperty() {
    this.props.navigator.push({
      screen: 'krooqi.PostProperty',
      title: 'Post Property',
      passProps: {},
      navigatorStyle: {
        screenBackgroundColor: 'white',
      },
      animationType: 'slide-up',
    });
  }

  openFindAgent() {
    this.props.navigator.push({
      screen: 'krooqi.FindAgent',
      title: 'Find Agent',
      passProps: {},
      navigatorStyle: {
        screenBackgroundColor: 'white',
      },
      navigatorButtons: {
        rightButtons: [
          {
            title: 'Filter',
            id: 'filterAgent',
          },
        ],
      },
      animationType: 'slide-up',
    });
  }

  render() {
    const { auth } = this.props;
    const ios = Platform.ios === 'ios';
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          {auth.success && auth.success.image ? (
            <Image style={styles.imageStyle} source={{ uri: auth.success.image }} />
          ) : (
            <Icon name="md-person" size={100} color={backgroundColor} style={styles.iconStyle} />
          )}

          {!!auth.success && !!auth.success.name && <Text>{auth.success.name}</Text>}
          {!!auth.success && !!auth.success.email && <Text>{auth.success.email}</Text>}
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={this.openLogin} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>{auth.success ? 'Logout' : 'Login'} </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.bottomView}>
          <View style={styles.leftView}>
            <TouchableHighlight onPress={this.openPostProperty} underlayColor="white">
              <View style={{ alignItems: 'center' }}>
                <Icon name={ios ? 'ios-home' : 'md-home'} size={30} color={backgroundColor} />
                <Text>Post Property</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.rightView}>
            <TouchableHighlight onPress={this.openFindAgent} underlayColor="white">
              <View style={{ alignItems: 'center' }}>
                <Icon name="md-contacts" size={30} color={backgroundColor} />
                <Text>Find Agent</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

More.propTypes = {
  auth: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(More);

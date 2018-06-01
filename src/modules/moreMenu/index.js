import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, AsyncStorage, View, Text, TouchableHighlight, Platform, Image, Picker } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import RNRestart from 'react-native-restart';
import Icon from 'react-native-vector-icons/Ionicons';
import * as AuthAction from '../../Actions/AuthAction';
import { updatelang } from '../../Actions/propertyPostAction';
import styles from './styles';
import { backgroundColor, USER_DATA } from '../../constants/config';
import I18n from '../../i18n';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

const CANCEL_INDEX = 0;
const options = [ 'Cancel', 'Arabic', 'English' ];
const title = 'Choose your preferred language';

class More extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'en',
      FbMsg: false,
    };
    this.openLogin = this.openLogin.bind(this);
    this.openPostProperty = this.openPostProperty.bind(this);
    this.openFindAgent = this.openFindAgent.bind(this);
    this.openChat = this.openChat.bind(this);
    this.setTranslate = this.setTranslate.bind(this);
    this.showActionSheet = this.showActionSheet.bind(this);
  }

  componentDidMount(){
    AsyncStorage.getItem('lang').then((value) => {
      if(value == null){
        this.setState({
          lang: 'en'
        })
      }else{
        this.setState({
          lang: value
        })
      }
    }).done();
  }

  componentWillReceiveProps() {
    AsyncStorage.getItem(USER_DATA).then((value) => {
      if(value == null){
        // do nothing
      }else{
        let tempValue = JSON.parse(value);
        if(tempValue.is_new){
          this.setState({ FbMsg: tempValue.is_new })
          let newTempValue = {...tempValue, is_new: false}
          console.log(newTempValue);
          
          AsyncStorage.setItem(USER_DATA, JSON.stringify(newTempValue));  
        }else{
          this.setState({ FbMsg: false })
        }
      }
    }).done();
  }

  openLogin() {
    const { auth } = this.props;
    if (auth.success) {
      this.props.actions.logout();
    } else {
      this.props.navigator.showModal({
        screen: 'krooqi.Login',
        passProps: {
          label: `${I18n.t('to_save_a_home').toProperCase()}`,
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
      title: `${I18n.t('m_post_pro').toProperCase()}`,
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
      title: `${I18n.t('m_find_age').toProperCase()}`,
      passProps: {},
      navigatorStyle: {
        screenBackgroundColor: 'white',
      },
      navigatorButtons: {
        rightButtons: [
          {
            title: `${I18n.t('s_filter').toProperCase()}`,
            id: 'filterAgent',
          },
        ],
      },
      animationType: 'slide-up',
    });
  }

  openChat() {
    this.props.navigator.push({
      screen: 'krooqi.ChatList',
      title: `${I18n.t('chatlist').toProperCase()}`,
      passProps: {},
      navigatorStyle: {
        screenBackgroundColor: 'white',
      },
      animationType: 'slide-up',
    });
  }

  showActionSheet() {
    this.ActionSheet.show()
  }
 
  async setTranslate(i) {
    if(i == 1){
      await AsyncStorage.setItem('lang', 'ar');
      this.setState({ lang: 'ar' });
      this.props.updatelang('ar'); 
      RNRestart.Restart();
    }
    
    if(i == 2){
      await AsyncStorage.setItem('lang', 'en');
      this.setState({ lang: 'en' });
      this.props.updatelang('en');  
      RNRestart.Restart();
    }
  }

  render() {
    const { auth } = this.props;
    const ios = Platform.ios === 'ios';
    const { lngRoot } = this.props.propertyPost;
    const { FbMsg, lang } = this.state;
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
          {
            !!auth.success && FbMsg && lang === "en" && <Text style={{ padding: 15, color: 'red' }}>An email has been sent to your inbox</Text>
          }
          {
            !!auth.success && FbMsg && lang !== "en" && <Text style={{ padding: 15, color: 'red' }}>تم إرسال بريد إلكتروني إلى صندوق الوارد الخاص بك</Text>
          }
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={this.openLogin} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>{auth.success ? `${I18n.t('m_logout').toProperCase()}` : `${I18n.t('m_login').toProperCase()}`} </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.bottomView}>
          <View style={styles.leftView}>
            <TouchableHighlight onPress={this.openPostProperty} underlayColor="white">
              <View style={{ alignItems: 'center' }}>
                <Icon name={ios ? 'ios-home' : 'md-home'} size={30} color={backgroundColor} />
                <Text>{I18n.t('m_post_pro').toProperCase()}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.middleView}>
            <TouchableHighlight onPress={this.openFindAgent} underlayColor="white">
              <View style={{ alignItems: 'center' }}>
                <Icon name="md-contacts" size={30} color={backgroundColor} />
                <Text>{I18n.t('m_find_age').toProperCase()}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.rightView}>
            <TouchableHighlight onPress={this.showActionSheet} underlayColor="white">
              <View style={{ alignItems: 'center' }}>
                <Icon name="ios-paper" size={30} color={backgroundColor} />
                <Text>{ this.state.lang == 'en' ? 'English' : 'عربى'}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        {
          auth.success &&
          auth.success.type === "agent" && (
            <View style={styles.bottomView}>
              <View style={styles.middleView}>
                <TouchableHighlight onPress={this.openChat} underlayColor="white">
                  <View style={{ alignItems: 'center' }}>
                    <Icon name="md-chatboxes" size={30} color={backgroundColor} />
                    <Text>{I18n.t('ChatMoreMenu').toProperCase()}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          )
        }

        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={title}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          onPress={this.setTranslate}
        />
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
    propertyPost: state.propertyPost,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthAction, dispatch),
    updatelang: (value) => dispatch(updatelang(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(More);
import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import styles from './styles';

const response = {
  error: false,
  success: false,
  cancel: false,
};

const FacebookLogin = ({ onFBLoginSuccess, onFbLoginFail, onFBLoginLoading }) => {
  const facebookLogin = () => {
    onFBLoginLoading();
    LoginManager.logOut()
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {        
        if (result.isCancelled) {
          onFbLoginFail();
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const { accessToken } = data;
            const responseInfoCallback = (error, res) => {
              if (error) {                
                onFbLoginFail(error);
              } else {                
                const success = {
                  token: accessToken,
                  name: res.name,
                  email: res.email,
                  imageUrl: res.picture.data.url,
                };
                onFBLoginSuccess(success);
              }
            };

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken,
                parameters: {
                  fields: {
                    string: 'email,name, picture',
                  },
                },
              },
              responseInfoCallback,
            );

            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      (error) => {
        onFbLoginFail(error);
      },
    );
  };
  return (
    <View>
      <TouchableHighlight onPress={facebookLogin} underlayColor="#f1f1f1">
        <Icon style={styles.fbLoginIcon} name="logo-facebook" size={30} color="#3B5998" />
      </TouchableHighlight>
    </View>
  );
};

FacebookLogin.propTypes = {
  onFBLoginSuccess: PropTypes.func.isRequired,
  onFBLoginLoading: PropTypes.func.isRequired,
  onFbLoginFail: PropTypes.func.isRequired,
};

export default FacebookLogin;

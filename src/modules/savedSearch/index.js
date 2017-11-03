import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class SaveSearch extends Component {
  render() {
    return (
      <View>
        <Text>Save search</Text>
      </View>
    );
  }
}

SaveSearch.propTypes = {};

export default SaveSearch;

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { View, Text } from 'react-native';

// const FBSDK = require('react-native-fbsdk');

// const { LoginButton, AccessToken } = FBSDK;

// class SavedSearch extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loginSuccess: false,
//       message: '',
//     };
//     this.loginFacebook = this.loginFacebook.bind(this);
//     this.logoutFacebook = this.logoutFacebook.bind(this);
//   }

//   loginFacebook(error, result) {
//     alert('login completec');
//     if (error) {
//       this.setState({ message: result.error.toString() });
//     } else if (result.isCancelled) {
//       this.setState({ message: 'canceled' });
//     } else {
//       AccessToken.getCurrentAccessToken().then((data) => {
//         this.setState({ message: data.accessToken.toString(), loginSuccess: true });
//       });
//     }
//   }

//   logoutFacebook() {
//     this.setState({ message: 'logged out' });
//   }

//   render() {
//     return (
//       <View>
//         <LoginButton
//           publishPermissions={['publish_actions']}
//           onLoginFinished={this.loginFacebook}
//           onLogoutFinished={this.logoutFacebook}
//         />
//         {this.state.loginSuccess && <Text>Login Success</Text>}
//         <Text>{this.state.message}</Text>
//       </View>
//     );
//   }
// }

// SavedSearch.propTypes = {};

// export default SavedSearch;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import { Image, View, TouchableHighlight, Text } from 'react-native';
import styles from './styles';

const options = {
  title: 'Select Avatar',
  allowsEditing: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class Media extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: '',
    };
    this.selectImage = this.selectImage.bind(this);
  }

  selectImage() {
    const self = this;
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        self.setState({
          avatarSource: source,
        });
      }
    });
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.selectImage}>
          <Text>Upload Photo</Text>
        </TouchableHighlight>
        {!!this.state.avatarSource && (
          <Image style={{ height: 100, width: 100 }} source={this.state.avatarSource} />
        )}
      </View>
    );
  }
}

Media.propTypes = {};

export default Media;

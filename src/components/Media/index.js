import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import { Image, View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
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
      ImageSource: null,
    };
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
  
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
  
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
  
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
        this.setState({

          ImageSource: source

        });
      }
    });
  }

  render() {
    return (
        <View style={styles.container}>

          <TouchableOpacity onPress={this.selectPhotoTapped}>

            <View style={styles.ImageContainer}>

            { this.state.ImageSource === null ? <Text>Select a Photo</Text> :
              <Image style={styles.ImageContainer} source={this.state.ImageSource} />
            }

            </View>

          </TouchableOpacity>

        </View>
      );
  }
}

Media.propTypes = {};

export default Media;


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import { AsyncStorage, Image, View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { Icon } from 'react-native-elements'
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
      ImageSource: [],
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
        // let source = { uri: response.uri };
  
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        let source = { uri: 'data:'+response.type+';base64,' + response.data }; // Dynamic Base 64

        // console.log(JSON.stringify(response));
        // console.log("Data : "+'data:'response.type+';base64,' + response.data);
        // alert(JSON.stringify(response));

        var tempArr =  new Array();
        tempArr = this.state.ImageSource
        let pushtempArr =  tempArr.push(source)

  
        this.setState({

          ImageSource: tempArr

        });

        let AsyncImg = new Array();
        this.state.ImageSource.map((imgUrl, i) => {
          let pushAsyncImg = AsyncImg.push(imgUrl.uri)
        })

        AsyncStorage.setItem('postImages', JSON.stringify(AsyncImg));
        // let parse = JSON.stringify(AsyncImg)
        // console.log('AsyncImg : '+JSON.stringify(AsyncImg))
        // console.log('parse : '+JSON.parse(parse))
      }
    });
  }

  removeImage = (i) => {
    let removeArr = this.state.ImageSource
    let index = removeArr.indexOf(i);
    var removedArray = removeArr.splice(i, 1)
    this.setState({
      ImageSource: removeArr
    })

    let AsyncImgRemove = new Array();
    this.state.ImageSource.map((imgUrl, i) => {
      let pushAsyncImgRemove = AsyncImgRemove.push(imgUrl.uri)
    })
    AsyncStorage.setItem('postImages', JSON.stringify(AsyncImgRemove));
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap',}}>                      
            {
              this.state.ImageSource.length > 0 && (
                this.state.ImageSource.map((imgUri, i) => {
                    let ii = {i}
                    let iValue = ii.i
                  return <View key={i} style={styles.ImageContainer}>
                    { imgUri.uri === null ? <Text>Select a Photo</Text> :
                      <Image style={styles.ImageContainer} source={{uri: imgUri.uri}} />
                    } 
                      <View style={styles.iconStyle}>         
                      <Icon
                        onPress={() => {this.removeImage(i)} }
                        name='remove-circle'
                        color='red'                        
                      />
                      </View>                  
                    </View>                  
                })
              )
            }
            { this.state.ImageSource.length < 5 && (
            <TouchableOpacity onPress={this.selectPhotoTapped}>
              <View style={styles.ImageContainer_1}>
                <Text style={{ color: 'red' }}>Add new</Text>
              </View>
            </TouchableOpacity> )
            }
          </View> 
        </View>
      );
  }
}

Media.propTypes = {};

export default Media;
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import styles from './styles';

const deviceWidth = Dimensions.get('window').width;
const FIXED_BAR_WIDTH = 280;
const BAR_SPACE = 10;

class Carousel extends Component {
  numItems = this.props.images.length;
  itemWidth = FIXED_BAR_WIDTH / this.numItems - (this.numItems - 1) * BAR_SPACE; // eslint-disable-line
  animVal = new Animated.Value(0);

  render() {
    const imageArray = [];
    const barArray = [];
    this.props.images.forEach((image, i) => {
      const thisImage = (
        <Image
          key={`image${i}`}
          source={{ uri: image }}
          style={{ width: deviceWidth }}
          resizeMode="cover"
        />
      );
      imageArray.push(thisImage);

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      });

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [{ translateX: scrollBarVal }],
              },
            ]}
          />
        </View>
      );
      barArray.push(thisBar);
    });

    return (
      <View style={styles.container} flex={1}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.animVal } } }])}
        >
          {imageArray}
        </ScrollView>
        <View style={styles.barContainer}>{barArray}</View>
        <View style={styles.closeContainer}>
          <TouchableWithoutFeedback onPress={this.props.closeModel}>
            <View>
              <Text style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', padding: 15, }}>Close</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  closeModel: PropTypes.func.isRequired,
};

export default Carousel;

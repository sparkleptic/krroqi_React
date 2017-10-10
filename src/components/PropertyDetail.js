import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from './Carousel';

const { width, height } = Dimensions.get('window');

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      modalVisible: false,
    };
    this.showModal = this.showModal.bind(this);
  }

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
        <Modal
          animationType="slide"
          transparent={false}
          style={{ backgroundColor: 'black' }}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <Carousel
            images={this.props.property.images}
            closeModel={() => {
              this.setState({ modalVisible: false });
            }}
          />
        </Modal>
      </View>
    );
  }

  showModal() {
    this.setState({ modalVisible: true });
  }

  render() {
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 1],
      extrapolate: 'clamp',
    });
    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        <StatusBar translucent barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.251)" />
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslate }] }]}>
          <TouchableWithoutFeedback onPress={this.showModal}>
            <Animated.Image
              style={[
                styles.backgroundImage,
                {
                  opacity: imageOpacity,
                  transform: [{ translateY: imageTranslate }],
                },
              ]}
              source={{ uri: this.props.property.thumbnail }}
            />
          </TouchableWithoutFeedback>
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [{ scale: titleScale }, { translateY: titleTranslate }],
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <View>
              <TouchableWithoutFeedback onPress={this.props.closeModel}>
                {Platform.OS === 'ios' ? (
                  <Icon name="ios-close" size={30} />
                ) : (
                  <Icon name="md-close" size={30} />
                )}
              </TouchableWithoutFeedback>
            </View>
            <View style={{ flexGrow: 1 }} />
            <View>
              {Platform.OS === 'ios' ? (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Icon name="ios-heart-outline" size={30} style={{ marginRight: 20 }} />
                  <Icon name="ios-share-outline" size={30} />
                </View>
              ) : (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Icon name="md-heart-outline" size={30} style={{ marginRight: 20 }} />
                  <Icon name="md-share" size={30} />
                </View>
              )}
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f7941e',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Animated } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      expanded: false,
      animation: new Animated.Value(46.5),
    };
    this.setMinHeight = this.setMinHeight.bind(this);
    this.setMaxHeight = this.setMaxHeight.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height,
    });
  }

  setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height,
    });
  }

  toggle() {
    const initialValue = this.state.expanded
      ? this.state.maxHeight + this.state.minHeight
      : this.state.minHeight;

    const finalValue = this.state.expanded
      ? this.state.minHeight
      : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded,
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue,
    }).start();
  }

  render() {
    let icon = 'ios-arrow-down';

    if (this.state.expanded) {
      icon = 'ios-arrow-up';
    }
    const { title, animation } = this.state;
    const { children, data, text } = this.props;
    return (
      <Animated.View style={[styles.container, { height: animation }]}>
        <TouchableHighlight style={styles.button} onPress={this.toggle} underlayColor="#f1f1f1">
          <View style={styles.titleContainer} onLayout={this.setMinHeight}>
            <Text style={styles.title}>{title}</Text>
            {!!data && (
              <Text>
                {data.start || data.end ? (
                  <Text>
                    {data.start || 'No Min'} - {data.end || 'No Max'}
                  </Text>
                ) : (
                  <Text>Any</Text>
                )}
              </Text>
            )}
            {!!text && <Text>{text}</Text>}
            <Icon style={styles.iconStyle} name={icon} size={24} />
          </View>
        </TouchableHighlight>
        <View style={styles.body} onLayout={this.setMaxHeight}>
          {children}
        </View>
      </Animated.View>
    );
  }
}

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
  text: PropTypes.string,
  children: PropTypes.element.isRequired,
};

Panel.defaultProps = {
  data: {},
  text: '',
};

export default Panel;

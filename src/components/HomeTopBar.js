import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

const HomeTopBar = props => {
    return (
        <View style={styles.container}>
            <Image style={{height: 40, width: 140}} resizeMode={'contain'} source={require('./../images/KR-Logo.png')} />
        </View>
    );
};

HomeTopBar.propTypes = {
    
};

export default HomeTopBar;
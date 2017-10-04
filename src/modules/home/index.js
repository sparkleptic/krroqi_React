import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { getLanguages } from 'react-native-i18n'
import I18n from './../../i18n';

class Home extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        getLanguages().then(languages => {
            console.log(languages) // ['en-US', 'en']
        });
        console.log('hello') // ['en-US', 'en']
    }

    render() {
        return (
            <View>
                <Text>{I18n.t('hello')}</Text>
                <Text>{I18n.start}</Text>
            </View>
        );
    }
}

Home.propTypes = {

};

export default Home;
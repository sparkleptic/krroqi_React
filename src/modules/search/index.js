import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import I18n from '../../i18n';

class SearchPage extends Component {
    render() {
        return (
            <View>
                <Text>{I18n.start}</Text>
            </View>
        );
    }
}

SearchPage.propTypes = {

};

export default SearchPage;  
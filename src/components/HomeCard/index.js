import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropertyCard from '../PropertyCard';
import * as PropertiesActions from '../../Actions/PropertiesAction';
import { backgroundColor } from '../../constants/config';

const H1 = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 10px 5px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #e3e3e3;
  margin: 5px;
`;

const ButtonText = styled.Text`
  color: ${backgroundColor};
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  padding: 5px;
`;

class HomeCard extends Component {
  constructor(props) {
    super(props);
    this.pushList = this.pushList.bind(this);
    this.pushDetail = this.pushDetail.bind(this);
    this.closeModel = this.closeModel.bind(this);
  }
  pushList(title, category) {
    this.props.actions.propertiesByCategoryLoad(category);
    this.props.navigator.push({
      screen: 'krooqi.PropertyList',
      title,
      passProps: {
        category,
      },
    });
  }
  pushDetail(property) {
    this.props.navigator.showModal({
      screen: 'krooqi.PropertyDetail',
      title: '',
      animated: true,
      navigatorStyle: {
        navBarHidden: true,
      },
      passProps: {
        property,
        closeModel: this.closeModel,
      },
    });
  }
  closeModel() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }

  render() {
    const { data } = this.props;
    const key = Object.keys(data)[0];
    let title = '';
    if (key === 'sale') {
      title = 'Property for Sale';
    } else if (key === 'rent') {
      title = 'Property for Rent';
    } else if (key === 'development') {
      title = 'Development';
    } else if (key === 'featured') {
      title = 'Featured Listing';
    } else {
      title = '';
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <H1>{title}</H1>
        <FlatList
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={260}
          renderItem={({ item }) => <PropertyCard property={item} onCardPress={this.pushDetail} />}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          keyExtractor={item => item.ID}
          data={data[key]}
        />
        <Divider />
        <TouchableWithoutFeedback onPress={() => this.pushList(title, key)}>
          <View>
            <ButtonText>See All</ButtonText>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

HomeCard.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PropertiesActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(HomeCard);

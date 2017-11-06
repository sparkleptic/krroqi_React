import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import SavedSearchCard from '../../components/SavedSearchCard';
import * as PropertiesActions from './../../Actions/PropertiesAction';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.pushDetail = this.pushDetail.bind(this);
    this.closeModel = this.closeModel.bind(this);
  }

  componentWillMount() {
    this.props.actions.savedSearchLoad();
  }

  onRefresh() {
    this.props.actions.savedSearchLoad();
  }

  closeModel() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  pushDetail(item) {
    this.props.actions.filteredPropertiesLoad(item);
    this.props.navigator.switchToTab({
      tabIndex: 0,
    });
  }

  render() {
    const { savedSearch } = this.props;
    return (
      <FlatList
        data={savedSearch.success}
        renderItem={({ item }) => <SavedSearchCard item={item} onCardPress={this.pushDetail} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item, index) => index}
        refreshing={savedSearch.loading}
        onRefresh={this.onRefresh}
      />
    );
  }
}

Favorites.propTypes = {
  navigator: PropTypes.object.isRequired,
  savedSearch: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  savedSearch: state.savedSearch,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PropertiesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

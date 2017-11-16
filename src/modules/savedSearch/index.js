import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, FlatList, Text, TouchableHighlight } from 'react-native';
import SavedSearchCard from '../../components/SavedSearchCard';
import * as PropertiesActions from './../../Actions/PropertiesAction';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: props.auth,
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.pushDetail = this.pushDetail.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    this.props.actions.savedSearchLoad();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth && JSON.stringify(this.state.auth) !== JSON.stringify(nextProps.auth)) {
      this.setState({ auth: nextProps.auth });
    }
  }

  onRefresh() {
    this.props.actions.savedSearchLoad();
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected' && event.selectedTabIndex === 3) {
      if (!this.state.auth.success) {
        this.openLogin();
      }
    }
  }

  openLogin() {
    this.props.navigator.showModal({
      screen: 'krooqi.Login',
      passProps: {
        label: 'to save a home',
      },
      navigatorStyle: {
        navBarHidden: true,
        screenBackgroundColor: 'white',
      },
      animationType: 'slide-up',
    });
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
    const { savedSearch, auth } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* {loading && Platform.OS === 'ios' && <Loading />} */}
        {auth.success ? (
          <View style={{ flex: 1 }}>
            {savedSearch.success && savedSearch.success.length > 0 ? (
              <FlatList
                data={savedSearch.success}
                renderItem={({ item }) => (
                  <SavedSearchCard item={item} onCardPress={this.pushDetail} />
                )}
                ItemSeparatorComponent={() => (
                  <View style={{ borderBottomWidth: 1, borderColor: 'gray' }} />
                )}
                keyExtractor={(item, index) => index}
                refreshing={savedSearch.loading}
                onRefresh={this.onRefresh}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 40,
                }}
              >
                <Text style={{ lineHeight: 30, fontSize: 20 }}>Saved Search</Text>
                <Text
                  style={{
                    lineHeight: 25,
                    fontSize: 16,
                    color: 'gray',
                    textAlign: 'center',
                  }}
                >
                  you haven't saved any searches yet.
                </Text>
                <Text
                  style={{
                    lineHeight: 25,
                    fontSize: 16,
                    color: 'gray',
                    textAlign: 'center',
                  }}
                >
                  Save your search criteria for easy access.
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Please Login to view your Saved Search</Text>
            <TouchableHighlight onPress={this.openLogin} underlayColor="#f1f1f1">
              <View
                style={{
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 4,
                  margin: 10,
                  borderColor: 'gray',
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: '400' }}>Login</Text>
              </View>
            </TouchableHighlight>
          </View>
        )}
      </View>
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
  auth: state.auth,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PropertiesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

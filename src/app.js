/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {AsyncStorage, View, I18nManager } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import Analytics from 'mobile-center-analytics';
import { registerScreens } from './screens';
import { iconsMap, iconsLoaded } from './utils/AppIcons';
import I18n from './i18n';
import configureStore from './store/configureStore';
import { backgroundColor } from './constants/config';
// import Mobile Center Analytics at the top of the file.

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

Analytics.trackEvent('Video clicked', { Category: 'Music', FileName: 'favorite.avi' });

const store = configureStore();

registerScreens(store, Provider);

const navigatorStyle = {
  navBarTranslucent: true,
  drawUnderNavBar: true,
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
  statusBarTextColorScheme: 'light',
  drawUnderTabBar: true,
};

class App extends Component {
  constructor(props) {
    super(props);

    iconsLoaded.then(() => {
      this.initialTabIndex = 0;
      this.tabs = [
        {
          label: `${I18n.t('ft_search').capitalize()}`,
          screen: 'krooqi.Search',
          icon: iconsMap['ios-search-outline'],
          selectedIcon: iconsMap['ios-search'],
          title: `${I18n.t('ft_search').capitalize()}`,
          navigatorButtons: {
            rightButtons: [
              {
                title: `${I18n.t('s_filter').capitalize()}`,
                id: 'filter',
                showAsAction: 'ifRoom',
                buttonColor: 'white',
                buttonFontSize: 14,
                buttonFontWeight: '600',
              },
            ],
          },
          navigatorStyle: {
            navBarCustomView: 'krooqi.SearchTopBar',
            navBarComponentAlignment: 'fill',
          },
        },
        {
          label: `${I18n.t('ft_home').capitalize()}`,
          screen: 'krooqi.Home',
          icon: iconsMap['ios-home-outline'],
          selectedIcon: iconsMap['ios-home'],
          title: `${I18n.t('ft_home').capitalize()}`,
          navigatorStyle: {
            navBarCustomView: 'krooqi.HomeTopBar',
            navBarComponentAlignment: 'fill',
          },
        },
        {
          label: `${I18n.t('ft_favourites').capitalize()}`,
          screen: 'krooqi.Favorites',
          icon: iconsMap['ios-heart-outline'],
          selectedIcon: iconsMap['ios-heart'],
          title: `${I18n.t('ft_favourites').capitalize()}`,
        },
        {
          label: `${I18n.t('ft_saved_search').capitalize()}`,
          screen: 'krooqi.SavedSearch',
          icon: iconsMap['ios-bookmark-outline'],
          selectedIcon: iconsMap['ios-bookmark'],
          title: `${I18n.t('ft_saved_search').capitalize()}`,
        },
        {
          label:`${I18n.t('ft_more').capitalize()}`,
          screen: 'krooqi.MoreMenu',
          icon: iconsMap['ios-more-outline'],
          selectedIcon: iconsMap['ios-more'],
          title: `${I18n.t('ft_more').capitalize()}`,
        },
      ];
      if (I18nManager.isRTL) {
        this.tabs.reverse();
        this.initialTabIndex = 4;
      }
      this.startApp();
    });
  }

  startApp() {
    Navigation.startTabBasedApp({
      tabs: this.tabs,
      tabsStyle: {
        tabBarBackgroundColor: '#F6F6F6',
        tabBarButtonColor: '#000000',
        tabBarSelectedButtonColor: backgroundColor,
        tabFontFamily: 'BioRhyme-Bold',
        initialTabIndex: this.initialTabIndex,
      },
      appStyle: {
        navBarTextColor: '#000000',
        navBarButtonColor: '#FFFFFF',
        tabBarSelectedButtonColor: backgroundColor,
        navigationBarColor: '#000000',
        navBarBackgroundColor: backgroundColor,
        statusBarColor: backgroundColor,
        tabFontFamily: 'BioRhyme-Bold',
        screenBackgroundColor: '#E9EBEE',
        tabBarTranslucent: false,
        orientation: 'portrait',
      },
    });
  }
}

export default App;

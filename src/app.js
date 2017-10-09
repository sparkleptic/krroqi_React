/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View, I18nManager } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';
import { iconsMap, iconsLoaded } from './utils/AppIcons';
import I18n from './i18n';


import configureStore from './store/configureStore';

const store = configureStore();

registerScreens(store, Provider);

const navigatorStyle = {
	navBarTranslucent: true,
	drawUnderNavBar: true,
	navBarTextColor: 'white',
	navBarButtonColor: 'white',
	statusBarTextColorScheme: 'light',
	drawUnderTabBar: true
};


class App extends Component {
	constructor(props) {
		super(props);
		iconsLoaded.then(() => {
			this.initialTabIndex = 0;
			this.tabs = [
				{
					label: I18n.t('hello'),
					screen: 'krooqi.Home',
					icon: iconsMap['ios-home-outline'],
					selectedIcon: iconsMap['ios-home'],
					title: '',
				},
				{
					label: 'Search',
					screen: 'krooqi.Search',
					icon: iconsMap['ios-search-outline'],
					selectedIcon: iconsMap['ios-search'],
					title: 'Search',
				},
				{
					label: 'Favorites',
					screen: 'krooqi.Favorites',
					icon: iconsMap['ios-heart-outline'],
					selectedIcon: iconsMap['ios-heart'],
					title: 'Favorites',
				},
				{
					label: 'Saved Search',
					screen: 'krooqi.SavedSearch',
					icon: iconsMap['ios-bookmark-outline'],
					selectedIcon: iconsMap['ios-bookmark'],
					title: 'Saved Search',
				},
				{
					label: 'More',
					screen: 'krooqi.MoreMenu',
					icon: iconsMap['ios-more-outline'],
					selectedIcon: iconsMap['ios-more'],
					title: 'More',
				}
			]
			if(I18nManager.isRTL) {
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
				tabBarSelectedButtonColor: '#f7941e',
				tabFontFamily: 'BioRhyme-Bold',
				initialTabIndex: this.initialTabIndex,
			},
			appStyle: {
				navBarTextColor: '#000000',
				tabBarSelectedButtonColor: '#ff505c',
				navigationBarColor: '#000000',
				navBarBackgroundColor: '#f7941e',
				statusBarColor: '#000000',
				tabFontFamily: 'BioRhyme-Bold',
				screenBackgroundColor: '#E9EBEE'
			}
		});
	}
}

export default App;
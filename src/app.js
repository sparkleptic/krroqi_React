/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';
import { iconsMap, iconsLoaded } from './utils/AppIcons';


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
			this.startApp();
		});
	}

	startApp() {
		Navigation.startTabBasedApp({
			tabs: [
				{
					label: 'Home',
					screen: 'krooqi.Home',
					icon: iconsMap['ios-home-outline'],
					selectedIcon: iconsMap['ios-home'],
					title: 'Home',
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
			],
			tabsStyle: {
				tabBarBackgroundColor: '#F6F6F6',
				tabBarButtonColor: '#000000',
				tabBarSelectedButtonColor: '#f7941e',
				tabFontFamily: 'BioRhyme-Bold',
			},
			appStyle: {
				navBarTextColor: '#000000',
				tabBarSelectedButtonColor: '#ff505c',
				navigationBarColor: '#003a66',
				navBarBackgroundColor: '#f7941e',
				statusBarColor: '#002b4c',
				tabFontFamily: 'BioRhyme-Bold',
			}
		});
	}
}

export default App;
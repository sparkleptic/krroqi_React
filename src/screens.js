/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Home from './modules/home';
import Favorites from './modules/favorites';
import Search from './modules/search';
import SavedSearch from './modules/savedSearch';
import MoreMenu from './modules/moreMenu';
import PropertyList from './components/PropertyList';
import HomeTopBar from './components/HomeTopBar';
import PropertyDetail from './components/PropertyDetail';
import SearchTopBar from './components/SearchTopBar';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('krooqi.Home', () => Home, store, Provider);
  Navigation.registerComponent('krooqi.HomeTopBar', () => HomeTopBar);
  Navigation.registerComponent('krooqi.PropertyList', () => PropertyList, store, Provider);
  Navigation.registerComponent('krooqi.PropertyDetail', () => PropertyDetail, store, Provider);
  Navigation.registerComponent('krooqi.Search', () => Search, store, Provider);
  Navigation.registerComponent('krooqi.SearchTopBar', () => SearchTopBar, store, Provider);
  Navigation.registerComponent('krooqi.Favorites', () => Favorites, store, Provider);
  Navigation.registerComponent('krooqi.SavedSearch', () => SavedSearch, store, Provider);
  Navigation.registerComponent('krooqi.MoreMenu', () => MoreMenu, store, Provider);
}

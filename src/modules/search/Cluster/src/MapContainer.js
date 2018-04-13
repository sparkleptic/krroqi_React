import React, { Component } from 'react'
import { Dimensions, Platform } from 'react-native'
import GeoJSON from 'geojson'
import supercluster from 'supercluster'

import Map from './components/Map'
import Marker from './components/Marker'
import Cluster from './components/Cluster'

var flagIOS = 0;

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const initialRegion = {
	latitude: 23.8859,
	longitude: 45.0792,
	latitudeDelta: LATITUDE_DELTA,
	longitudeDelta: LONGITUDE_DELTA,
}

let northeast = {
	latitude: initialRegion.latitude + initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude + initialRegion.longitudeDelta / 2,
}
let southwest = {
	latitude: initialRegion.latitude - initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude - initialRegion.longitudeDelta / 2,
}
let northwest = {
	latitude: initialRegion.latitude - initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude + initialRegion.longitudeDelta / 2,
}
let southeast = {
	latitude: initialRegion.latitude + initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude - initialRegion.longitudeDelta / 2,
}

class MapContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			clusters: [],
			regionChangeLoc: {
				latitude: 23.8859,
				longitude: 45.0792,
				latitudeDelta: 25,
				longitudeDelta: 25,
			},
			nameSearch: '',
		}
	}

	componentDidMount() {
		const initialGeoLoc = this.props.regionGPS;
		this.setState({ regionChangeLoc: initialGeoLoc });	
	}

	_createCluster(data) {
		const items = GeoJSON.parse(data, { Point: ['latitude', 'longitude'] })
		const cluster = supercluster({ radius: 60, maxZoom: 16, nodeSize: 256 })
		cluster.load(items.features)
		return cluster;
	}

	_getZoomLevel(region) {
		const angle = region.longitudeDelta;
		const level = Math.round(Math.log(360 / angle) / Math.LN2);
		return level;
	}

	_createRegions(region) {
		const items = this._createCluster(this.props.data).getClusters([
			southwest.longitude,
			southwest.latitude,
			northeast.longitude,
			northeast.latitude
		], this._getZoomLevel(region))

		this.setState({
			clusters: items
		})
	}

	onRegionChangeComplete(region) {
		northeast = {
			latitude: region.latitude + region.latitudeDelta / 2,
			longitude: region.longitude + region.longitudeDelta / 2,
		}
		southwest = {
			latitude: region.latitude - region.latitudeDelta / 2,
			longitude: region.longitude - region.longitudeDelta / 2,
		}
		northwest = {
			latitude: region.latitude - region.latitudeDelta / 2,
			longitude: region.longitude + region.longitudeDelta / 2,
		}
		southeast = {
			latitude: region.latitude + region.latitudeDelta / 2,
			longitude: region.longitude - region.longitudeDelta / 2,
		}
		this._createRegions(region)
	}

	onRegionChange = (regionData) => {

		if ( Platform.OS !== 'ios' || flagIOS > 1 ) {

		const initialGeoLoc = this.props.regionGPS
		const { regionChangeLoc, nameSearch } = this.state;

		nameSearch != initialGeoLoc.searchText ? this.setState({ nameSearch: initialGeoLoc.searchText }) : null;

		this.setState({ regionChangeLoc: regionData })
		}else{
			flagIOS = flagIOS+1;
		}
	}

	render() {
		const initialGeoLoc = this.props.regionGPS;
		const { regionChangeLoc, nameSearch } = this.state;
		let renderRegionValue = nameSearch != initialGeoLoc.searchText ? initialGeoLoc : regionChangeLoc;

		return (
			<Map
				onPress={this.props.dismissNotification}
				initialRegion={initialGeoLoc}
				region={renderRegionValue}
				onRegionChangeComplete={(x) => { this.onRegionChangeComplete(x) }}
				onRegionChange={(regionChange) => { this.onRegionChange(regionChange);}}
				minZoomLevel={4}
				{...this.props}
			>
				{
					this.state.clusters.map((item, i) => (item.properties.cluster === true) ?
						<Cluster key={i} item={item} /> :
						<Marker key={i} item={item} />
					)
				}
			</Map>
		)
	}
}

export default MapContainer

import React from 'react'
import { Linking, Platform, StyleSheet, TouchableOpacity, Image } from 'react-native'
import MapView from 'react-native-maps'

export default class CustomView extends React.Component {
	render() {
		if (this.props.currentMessage.location) {
			return (
				<TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={() => {
					const url = Platform.select({
						ios: `http://maps.apple.com/?ll=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`,
						android: `http://maps.google.com/?q=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`
					})
					Linking.canOpenURL(url).then(supported => {
						if (supported) {
							return Linking.openURL(url)
						}
					}).catch(err => {
						console.error('An error occurred', err)
					})
				}}>
					<MapView
						style={[styles.view, this.props.mapViewStyle]}
						region={{
							latitude: this.props.currentMessage.location.latitude,
							longitude: this.props.currentMessage.location.longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
						scrollEnabled={false}
						zoomEnabled={false}
					>
						<MapView.Marker coordinate={{
							latitude: this.props.currentMessage.location.latitude,
							longitude: this.props.currentMessage.location.longitude,
						}} />
					</MapView>
				</TouchableOpacity>
			)
		} else if (this.props.currentMessage.image) {
			<Image style={styles.view} source={{ uri: this.props.currentMessage.image }} />
		}
		return null
	}
}

const styles = StyleSheet.create({
	container: {
	},
	view: {
		width: 200,
		height: 200,
		borderRadius: 13,
		margin: 3,
	},
})
import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import { Camera, Chat, ChatView, Contact, Settings } from '../screens'

const tabBarIcon = (nameActive, nameInactive) => {
	let prefix = Platform.OS === 'ios' ? 'ios' : 'md'
	let sufix = Platform.OS === 'ios' ? '' : ''
	return ({ tintColor, focused }) => (
		<Icon type={'Ionicons'} name={focused ? `${prefix}-${nameActive}` : `${prefix}-${nameInactive}${sufix}`} style={{ color: tintColor }} />
	)
}

const TabNavigator = createBottomTabNavigator(
	{
		Contact: {
			screen: Contact,
			navigationOptions: {
				tabBarIcon: tabBarIcon('people', 'people')
			}
		},
		Camera: {
			screen: Camera,
			navigationOptions: {
				tabBarIcon: tabBarIcon('camera', 'camera')
			}
		},
		Chat: {
			screen: Chat,
			navigationOptions: {
				tabBarIcon: tabBarIcon('chatbubbles', 'chatbubbles')
			}
		},
		Settings: {
			screen: Settings,
			navigationOptions: {
				tabBarIcon: tabBarIcon('options', 'options')
			}
		}
	}, {
		initialRouteName: 'Chat'
	}
)

TabNavigator.navigationOptions = ({ navigation }) => {
	const component = TabNavigator.router.getComponentForState(navigation.state)
	if (typeof component.navigationOptions === 'function') {
		return component.navigationOptions({ navigation: _.navigation })
	}
	return component.navigationOptions
}

export default createStackNavigator(
	{
		Tab: TabNavigator,
		ChatView: ChatView
	}, {
		initialRouteName: 'Tab'
	}
)
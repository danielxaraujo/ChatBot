import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
import { Camera, Chat, ChatView, Contact, Login, Menu, Settings } from '../screens'
//import { isSignedIn } from '../components'

const chatRouteConfigs = {
	Chat: {
		screen: Chat,
		navigationOptions: {
			title: 'Conversas'
		},
	},
	ChatView: {
		screen: ChatView
	}
}

const chatNavigator = createStackNavigator(chatRouteConfigs, {
	initialRouteName: 'Chat',
})

const mainRouteConfigs = {
	Contact: {
		screen: Contact,
		navigationOptions: {
			title: 'Contatos'
		},
	},
	Camera: {
		screen: Camera,
		navigationOptions: {
			title: 'Câmera'
		},
	},
	Chat: {
		name: 'Chat',
		screen: chatNavigator,
		navigationOptions: {
			title: 'Conversas'
		},
	},
	ChatView: {
		screen: ChatView
	},
	Settings: {
		screen: Settings,
		navigationOptions: {
			title: 'Conversas'
		}
	}
}

const mainNavigator = createDrawerNavigator(mainRouteConfigs, {
	initialRouteName: 'Chat',
	contentComponent: Menu,
	contentOptions: {
		lableStyle: {
			fontWeight: 'nomal',
			fontSize: 20
		},
		activeLabelStyle: {
			color: '#080'
		}
	}
})

const routeSwiteConfigs = {
	Login: {
		screen: Login,
		headerMode: 'none'
	},
	Home: {
		name: 'Home',
		screen: mainNavigator
	}
}

const result = false// isSignedIn()

export default createSwitchNavigator(routeSwiteConfigs, {
	initialRouteName: result ? 'Home' : 'Login'
})
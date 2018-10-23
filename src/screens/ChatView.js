import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat'
import isIphoneX from '../utils/DeviceUtil'
import CustomActions from './CustomActions'
import CustomView from './CustomView'

const server = 'http://192.168.0.11:3001/api/messages'
const userId = '5bce2c234d5eae61d4bb6a38'
let context = {
	contexts: [],
	lang: "pt-BR",
	sessionId: "123456789"
}

export default class Example extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			messages: [],
			loadEarlier: true,
			typingText: null,
			isLoadingEarlier: false,
		}

		this._isMounted = false
		this.onSend = this.onSend.bind(this)
		this.renderCustomActions = this.renderCustomActions.bind(this)
		this.renderBubble = this.renderBubble.bind(this)
		this.renderSystemMessage = this.renderSystemMessage.bind(this)
		this.renderFooter = this.renderFooter.bind(this)
		this.onLoadEarlier = this.onLoadEarlier.bind(this)
	}

	async componentWillMount() {
		this._isMounted = true
		const messages = await this.loadMessages()
		this.setState({ messages })
	}

	loadMessages = async (old = '/current') => {
		try {
			const response = await fetch(`${server}${old}/${context.sessionId}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				}
			})
			const messages = await response.json()
			return this.parseMessages(messages)
		} catch (err) {
			console.warn(`Erro ao consulta mensagens: ${err}`)
		}
	}

	sendMessages = async (message) => {
		try {
			const response = await fetch(`${server}/chatbot`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: {
						...context,
						query: message.text
					},
					userId
				})
			})
			const messages = await response.json()
			return this.parseMessages(messages)
		} catch (err) {
			console.warn(`Erro ao enviar mensagens: ${err}`)
		}
	}

	parseMessages = (messages = []) => {
		for (let i = 0; i < messages.length; i++) {
			messages[i].createdAt = new Date(messages[i].createdAt)
			if (messages[i].user.avatar) {
				messages[i].user.avatar = require(`../../assets/inss.png`)
			}
		}
		return messages
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	async onLoadEarlier() {
		this.setState({ isLoadingEarlier: true })
		if (this._isMounted === true) {
			const messages = await this.loadMessages('/old')
			this.setState(previousState => {
				return {
					messages: GiftedChat.prepend(previousState.messages, messages),
					loadEarlier: false,
					isLoadingEarlier: false,
				}
			})
		}
	}

	async onSend(messages = []) {
		if (messages.length > 0) {
			messages[0].sent = true
			this.setState(previousState => {
				return {
					typingText: 'Aguardo resposta do servidor',
					messages: GiftedChat.append(previousState.messages, [messages[0]])
				}
			})
			const result = await this.sendMessages(messages[0])
			context = result.data
			messages[0].received = true
			messages[0]._id = result.userMessageId
			this.setState(previousState => {
				return {
					typingText: null,
					messages: GiftedChat.append(previousState.messages, this.parseMessages([result.systemMessage]))
				}
			})
		}
	}

	renderCustomActions(props) {
		return (
			<CustomActions
				{...props}
			/>
		)
	}

	renderBubble(props) {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					left: {
						backgroundColor: '#f0f0f0',
					}
				}}
			/>
		)
	}

	renderSystemMessage(props) {
		return (
			<SystemMessage
				{...props}
				containerStyle={{
					marginBottom: 15,
				}}
				textStyle={{
					fontSize: 14,
				}}
			/>
		)
	}

	renderCustomView(props) {
		return (
			<CustomView
				{...props}
			/>
		)
	}

	renderFooter(props) {
		if (this.state.typingText) {
			return (
				<View style={styles.footerContainer}>
					<Text style={styles.footerText}>
						{this.state.typingText}
					</Text>
				</View>
			)
		}
		return null
	}

	render() {
		return (
			<View style={styles.container}>
				<GiftedChat
					messages={this.state.messages}
					onSend={this.onSend}
					loadEarlier={this.state.loadEarlier}
					onLoadEarlier={this.onLoadEarlier}
					isLoadingEarlier={this.state.isLoadingEarlier}

					user={{
						_id: userId, // sent messages should have same user._id
					}}

					renderBubble={this.renderBubble}
					renderSystemMessage={this.renderSystemMessage}
					renderFooter={this.renderFooter}
					renderActions={this.renderCustomActions}
					renderCustomView={this.renderCustomView}
					bottomOffset={isIphoneX() ? 36 : 0}
				/>
				{isIphoneX() && <View style={{ height: 36, backgroundColor: 'white' }} />}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	footerContainer: {
		marginTop: 5,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
	},
	footerText: {
		fontSize: 14,
		color: '#aaa',
	},
})
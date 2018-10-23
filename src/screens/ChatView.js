import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat'
import CustomActions from './CustomActions'
import CustomView from './CustomView'

const server = 'http://127.0.0.1:3001/api/messages'
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
		this._isMounted = true //Indica que o Componente está ativo ou não
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
			console.warn(err)
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
					context: {
						...context,
						query: message.text
					},
					userId
				})
			})
			const messages = await response.json()
			return this.parseMessages(messages)
		} catch (err) {
			console.warn(err)
		}
	}

	parseMessages = (messages = []) => {
		console.log(messages)
		for (let i = 0 i < messages.length i++) {
			messages[i].createdAt = new Date(messages[i].createdAt)
			if (messages[i].user.avatar) {
				messages[i].user.avatar = require(`../../assets/inss.png`)
			}
		}
		return messages
	}

	componentWillUnmount() {
		this._isMounted = false //Indica que o Componente está ativo ou não
	}

	async onLoadEarlier() {
		this.setState({ isLoadingEarlier: true })//Habilita o spinner aguardando o carregamento das mensagens
		if (this._isMounted === true) {
			const messages = await this.loadMessages('/old')
			this.setState(previousState => {
				return {
					messages: GiftedChat.prepend(previousState.messages, messages),
					loadEarlier: false, //Desabilita o botão para carregar mensagens anteriores
					isLoadingEarlier: false,
				}
			})
		}
	}

	async onSend(messages = []) {
		if (messages.length > 0) {
			const result = await this.sendMessages(messages[0])
			context = result.context
			this.setState(previousState => {
				return {
					messages: GiftedChat.append(previousState.messages, this.parseMessages(result.messages))
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
			<SafeAreaView>
				<View>
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
					/>
				</View>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
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
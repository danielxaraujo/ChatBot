import React from 'react'
import { Component } from 'react'
import { Container, Content, Text } from 'native-base'

export default class Contact extends Component {

	static navigationOptions = {
		title: 'Contatos'
	}

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Container>
				<Content>
					<Text>Contact</Text>
				</Content>
			</Container>
		)
	}
}
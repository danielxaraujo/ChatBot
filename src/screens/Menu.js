import React from 'react'
import { Component } from 'react'
import { DrawerItems } from 'react-navigation'
import { Container, Content } from 'native-base'

export default class Menu extends Component {

    constructor(props) {
		super(props)
	}

	render() {
		return (
			<Container>
				<Content>
					<DrawerItems {...this.props} />
				</Content>
			</Container>
		)
	}
}
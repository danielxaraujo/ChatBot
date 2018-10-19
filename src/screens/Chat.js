import React from 'react'
import { Component } from 'react'
import { Container, Content, List, ListItem, Left, Body, Right, Text, Thumbnail } from 'native-base'

const data = [
    {
        key: 1,
        title: 'INSS',
        subtitle: 'Instituto Nacional do Seguro Social',
        avatar: require('../../assets/inss.png'),
        time: '09:45am'
    }
]

export default class Chat extends Component {

    static navigationOptions = {
        title: 'Conversas',
        headerBackTitle: null
    }

    constructor(props) {
        super(props)
    }

    showChat = id => {
        this.props.navigation.push('ChatView', {
            chatId: id
        })
    }

    render() {
        return (
            <Container>
                <Content>
                    <List dataArray={data} renderRow={item =>
                        <ListItem thumbnail onPress={() => this.showChat(item.key)}>
                            <Left>
                                <Thumbnail source={item.avatar} />
                            </Left>
                            <Body>
                                <Text>{item.title}</Text>
                                <Text note>{item.subtitle}</Text>
                            </Body>
                            <Right>
                            </Right>
                        </ListItem>
                    }>
                    </List>
                </Content>
            </Container>
        )
    }
}
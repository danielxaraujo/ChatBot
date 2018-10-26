import React from 'react'
import { Component } from 'react'
import { StyleSheet, Image, ScrollView, View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Item, Input, Icon } from 'native-base'
import LinearGradient from 'react-native-linear-gradient';

import logo from '../../assets/img/logo.png'

export default class Camera extends Component {

    constructor(props) {
        super(props)
    }

    login = () => {
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <LinearGradient colors={['#ffffff', '#ffffff', '#3388aa', '#005599']} style={styles.background}>
                <View style={styles.header}>
                    <Image source={logo} style={styles.logo} />
                </View>
                <View style={styles.container}>
                    <Item style={styles.item}>
                        <Icon type={'FontAwesome'} name={'envelope'} style={styles.icon} />
                        <Input placeholder={'Username'} style={styles.input} placeholderTextColor={'rgba(255,255,255,.7)'} />
                    </Item>
                    <Item style={styles.item}>
                        <Icon type={'FontAwesome'} name={'lock'} style={styles.icon} />
                        <Input placeholder={'Password'} style={styles.input} placeholderTextColor={'rgba(255,255,255,.7)'} />
                    </Item>
                    <TouchableOpacity onPress={this.login} style={styles.button}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { console.warn('Forgot password?') }} style={styles.forgotButton}>
                        <Text style={styles.forgotButtonText}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        paddingTop: 70,
        paddingBottom: 50,
    },
    logo: {
        height: 200,
        aspectRatio: 1.5
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    item: {
        marginTop: 25,
        height: 50,
        borderBottomColor: 'rgba(255,255,255,.35)',
        borderBottomWidth: 1
    },
    icon: {
        width: 40,
        color: 'rgba(255,255,255,1)',
    },
    input: {
        fontFamily: 'SFCompactDisplay-Thin',
        fontSize: 22,
        color: 'rgba(255,255,255,1)',
    },
    button: {
        width: '100%',
        marginTop: 55,
        height: 60,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#66aa77'
    },
    buttonText: {
        fontFamily: 'SFCompactDisplay-Thin',
        fontSize: 24,
        color: 'rgb(255,255,255)'
    },
    forgotButton: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    forgotButtonText: {
        fontFamily: 'SFCompactDisplay-Thin',
        fontSize: 18,
        color: 'rgba(255,255,255,.7)'
    },
})
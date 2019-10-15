import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, ToastAndroid } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class LoginScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'A Nested Details Screen'),
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    login() {
        fetch('http://192.168.1.36:8888/MyShop/dangnhap.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then((Response) => Response.text())
            .then((ResponseData) => {
                alert('' + ResponseData);
                //this.props.navigation.pop();
            })
            .done()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>Vui lòng đăng nhập để thực hiện</Text>
                <TextInput onChangeText={(text) => this.setState({ username: text })} style={styles.textinput} placeholder={'Tên đăng nhập'}></TextInput>
                <TextInput onChangeText={(text) => this.setState({ password: text })} secureTextEntry={true} style={styles.textinput} placeholder={'mật khẩu'}></TextInput>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', width: '50%', padding: 5, justifyContent: "center" }}>
                        <View style={{ backgroundColor: 'green', margin: 10, flex: 1 }}>
                            <Button fontSize={25} style={styles.button} onPress={() => {
                                //this.login()
                                if (this.state.username === 'admin' && this.state.password === '123') {
                                    this.props.navigation.navigate("InforCard");
                                    // ToastAndroid.show(""+this.state.username);
                                } else {
                                    //alert("Thất bại");
                                    ToastAndroid.show("" + this.state.username, ToastAndroid.SHORT);
                                }
                            }
                            } title='Xem đơn hàng'></Button>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: '50%', padding: 5, justifyContent: "center" }}>
                        <View style={{ backgroundColor: 'green', margin: 10, flex: 1 }}>
                            <Button fontSize={25} style={styles.button} onPress={() => {
                                if (this.state.username === 'admin' && this.state.password === '123') {
                                    this.props.navigation.navigate("AllItem");
                                    // ToastAndroid.show(""+this.state.username);
                                } else {
                                    //alert("Thất bại");
                                    ToastAndroid.show("" + this.state.username, ToastAndroid.SHORT);
                                }
                            }
                            } title='Quản lý hàng'></Button>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CDFFEC',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textinput: {
        textAlign: 'center',
        width: "80%",
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 10,
        margin: 5,
        fontSize: 25
    },
    button: {
        marginRight: 5
    }
})
import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, ToastAndroid, } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


export default class AddScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('kieu', 'Thêm sản phẩm mới'),
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            tensp: this.props.navigation.getParam('tensp'),
            idloai: this.props.navigation.getParam('idloai') ,
            gia: this.props.navigation.getParam('gia'),
            anh: this.props.navigation.getParam('anh'),
            ghichu: this.props.navigation.getParam('ghichu'),

        }
    }

    update() {
        fetch("http://192.168.1.36:8888/MyShop/edititem.php", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: this.props.navigation.getParam('id'),
                tensp: this.state.tensp,
                idloai: this.state.idloai,
                gia: this.state.gia,
                anh: this.state.anh,
                ghichu: this.state.ghichu,
            })
        })
            .then((Response) => Response.text())
            .then((ResponseData) => {
                alert('' + ResponseData);
                this.props.navigation.navigate('AllItem');
            })
            .done()
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={{ height: "90%", alignItems: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 30, textAlign: 'center' }}>Nhập thông tin</Text>
                    <TextInput placeholder={navigation.getParam('tensp')} onChangeText={(text) => this.setState({ tensp: text })} style={styles.textinput}></TextInput>
                    {/* <TextInput onChangeText={(text) => this.setState({ password: text })} secureTextEntry={true} style={styles.textinput} placeholder={'mật khẩu'}></TextInput> */}
                    <TextInput placeholder={navigation.getParam('idloai')} onChangeText={(text) => this.setState({ idloai: text })} style={styles.textinput}></TextInput>
                    <TextInput placeholder={navigation.getParam('gia')} onChangeText={(text) => this.setState({ gia: text })} style={styles.textinput}></TextInput>
                    <TextInput placeholder={navigation.getParam('ghichu')} onChangeText={(text) => this.setState({ ghichu: text })} style={styles.textinput}></TextInput>
                    <TextInput placeholder={navigation.getParam('anh')} onChangeText={(text) => this.setState({ anh: text })} style={styles.textinput}></TextInput>
                </View>
                <View style={{ height: '10%', width: '100%', flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', width: '50%', padding: 5, justifyContent: "center" }}>
                        <View style={{ backgroundColor: 'green', margin: 10, flex: 1 }}>
                            <Button fontSize={25} style={styles.button} onPress={() => {
                                this.update();
                            }
                            } title='Xác nhận'></Button>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: '50%', padding: 5, justifyContent: "center" }}>
                        <View style={{ backgroundColor: 'green', margin: 10, flex: 1 }}>
                            <Button fontSize={25} style={styles.button} onPress={() => {
                                navigation.pop();
                            }
                            } title='Hủy bỏ'></Button>
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
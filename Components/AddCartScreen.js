import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, ToastAndroid, Alert} from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


export default class AddCartScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Đặt mua sản phẩm'
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            hoten: '',
            sdt: '',
            diachi: '',

        }
    }

    insert() {
        fetch("http://192.168.1.36:8888/MyShop/addnewcart.php", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                hoten: this.state.hoten,
                sdt: this.state.sdt,
                diachi: this.state.diachi,
                idhang: this.props.navigation.getParam('id'),
            })
        })
            .then((Response) => Response.text())
            .then((ResponseData) => {
                alert('' + ResponseData);
                this.props.navigation.pop();
            })
            .done()
    }


    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={{ height: "90%", alignItems: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 30, textAlign: 'center' }}>Nhập thông tin</Text>
                    <TextInput onChangeText={(text) => this.setState({ hoten: text })} style={styles.textinput} placeholder={'Họ và tên'}></TextInput>
                    {/* <TextInput onChangeText={(text) => this.setState({ password: text })} secureTextEntry={true} style={styles.textinput} placeholder={'mật khẩu'}></TextInput> */}
                    <TextInput keyboardType={"number-pad"} onChangeText={(text) => this.setState({ sdt: text })} style={styles.textinput} placeholder={'Số điện thoại'}></TextInput>
                    <TextInput onChangeText={(text) => this.setState({ diachi: text })} style={styles.textinput} placeholder={'Địa chỉ'}></TextInput>

                </View>
                <View style={{ height: '10%', width: '100%', flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', width: '50%', padding: 5, justifyContent: "center" }}>
                        <View style={{ backgroundColor: 'green', margin: 10, flex: 1 }}>
                            <Button fontSize={25} style={styles.button} onPress={() => {
                                //alert(this.props.navigation.getParam('id'));
                                //alert("thêm" + str)
                                Alert.alert(
                                    'Thông báo',
                                    'Bạn có chắc chắn muốn mua sản phẩm ' + navigation.getParam('tensp'),
                                    [
                                        { text: 'Hỏi lại sau', onPress: () => console.log('Ask me later pressed') },
                                        {
                                            text: 'Hủy bỏ',
                                            onPress: () => ToastAndroid.show('Đã hủy'),
                                            style: 'cancel',
                                        },
                                        { text: 'OK', onPress: () => this.insert() },
                                    ],
                                    { cancelable: false },
                                );
                                
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
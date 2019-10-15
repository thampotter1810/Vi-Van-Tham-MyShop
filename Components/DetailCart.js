import React, { Component } from 'react';
import { Text, View, Image, Button, ToastAndroid, StyleSheet, Linking, Alert } from 'react-native';
import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class DetailCart extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', 'A Nested Details Screen'),
        };
    };

    delete() {
        fetch("http://192.168.1.36:8888/MyShop/deletecart.php", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: this.props.navigation.getParam('itemId', 'null'),
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
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#A3FFA3" }}>
                <View style={{ flex: 9, width: "100%", alignItems: 'center' }}>
                    <Image style={{ width: 100, height: 100 }} source={{ uri: '' + navigation.getParam('anh', 'abc') }}></Image>
                    <Text>Số đơn hàng: {navigation.getParam('itemId', '0000')}</Text>
                    <Text>Tên sản phẩm: {navigation.getParam('otherParam', 'null')}</Text>
                    <Text>Người đặt: {navigation.getParam('tennguoi', 'null')}</Text>
                    <Text >SDT: </Text>
                    <Text style={{ color: 'blue' }} onPress={() => {
                        Linking.openURL(`tel:${navigation.getParam('sdt', '00')}`)
                    }}>{navigation.getParam('sdt', 'null')} </Text>
                    <Text>Địa chỉ nhận hàng: {navigation.getParam('diachi', 'null')}</Text>
                    <Text>Loại: {navigation.getParam('loai', 'null')}</Text>
                    <Text>Giá: {navigation.getParam('gia', 'null')} VND</Text>

                </View>
                <View style={styles.button}>
                    <Button uppercase={false} title='Xác nhận đơn hàng' onPress={() => {
                        Alert.alert(
                            'Thông báo',
                            'Bạn có chắc chắn muốn xác nhận đơn hàng của ' + navigation.getParam('tennguoi', 'null'),
                            [
                                { text: 'Hỏi lại sau', onPress: () => console.log('Ask me later pressed') },
                                {
                                    text: 'Hủy bỏ',
                                    onPress: () => ToastAndroid.show('Đã hủy'),
                                    style: 'cancel',
                                },
                                { text: 'OK', onPress: () => this.delete() },
                            ],
                            { cancelable: false },
                        );
                    }}></Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        flex: 1,
        borderRadius: 10,
    }
})
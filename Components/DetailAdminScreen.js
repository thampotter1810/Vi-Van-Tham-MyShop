import React, { Component } from 'react';
import { Text, View, Image, Button, ToastAndroid, StyleSheet, Alert } from 'react-native';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class DetailAdminScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', 'A Nested Details Screen'),
        };
    };

    del(){
        fetch("http://192.168.1.36:8888/MyShop/deleteitem.php", {
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
                this.props.navigation.navigate('AllItem');
            })
            .done()
    }


    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#A3FFA3" }}>
                <NavigationEvents
                    onWillFocus={this.willFocusAction}
                />
                <View style={{ flex: 9, width: "100%", alignItems: 'center' }}>
                    <Image style={{ width: 100, height: 100 }} source={{ uri: '' + navigation.getParam('anh', 'abc') }}></Image>
                    <Text>{navigation.getParam('itemId', 'null')}</Text>
                    <Text>Tên sản phẩm: {navigation.getParam('otherParam', 'null')}</Text>
                    <Text>Loại: {navigation.getParam('loai', 'null')}</Text>
                    <Text>Giá: {navigation.getParam('gia', 'null')} VND</Text>
                    <View style={{ borderTopWidth: 1, width: "100%" }}>
                        <Text style={{ fontSize: 25 }}>Thông tin sản phẩm:</Text>
                        <Text style={{ fontSize: 20, fontStyle: 'italic' }}>{navigation.getParam('ghichu', 'chưa có thông tin chi tiết cho sản phẩm này')}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1, margin: 5, width: '30%' }}>
                        <Button uppercase={false} title='Thêm sp' onPress={() => navigation.navigate('AddScreen', { loai: 1 })}></Button>
                    </View>
                    <View style={{ flex: 1, margin: 5, width: '30%' }}>
                        <Button uppercase={false} title='Sửa sp' onPress={() => navigation.navigate('Update', {
                            loai: 2,
                            id: this.props.navigation.getParam('itemId', 'null'),
                            kieu: 'Sửa thông tin',
                            tensp: navigation.getParam('otherParam', 'null'),
                            idloai: navigation.getParam('loai', 'null'),
                            gia: navigation.getParam('gia', 'null'),
                            anh: navigation.getParam('anh', 'abc'),
                            ghichu: navigation.getParam('ghichu', 'abc')
                        })}></Button>
                    </View>
                    <View style={{ flex: 1, margin: 5, width: '30%' }}>
                        <Button uppercase={false} title='Xóa sp' onPress={() => {
                            Alert.alert(
                                'Thông báo',
                                'Bạn có chắc chắn muốn xóa sản phẩm '+navigation.getParam('otherParam'),
                                [
                                    { text: 'Hỏi lại sau', onPress: () => console.log('Ask me later pressed') },
                                    {
                                        text: 'Hủy bỏ',
                                        onPress: () => ToastAndroid.show('Đã hủy'),
                                        style: 'cancel',
                                    },
                                    { text: 'OK', onPress: () => this.del() },
                                ],
                                { cancelable: false },
                            );
                        }}></Button>
                    </View>
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
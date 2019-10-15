import React, { Component } from 'react';
import { Text, View, Image, Button, ToastAndroid, StyleSheet } from 'react-native';
import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class DetailScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', 'A Nested Details Screen'),
        };
    };
    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#A3FFA3" }}>
                <View style={{ flex: 9, width:"100%", alignItems: 'center'}}>
                    <Image style={{ width: 100, height: 100 }} source={{ uri: '' + navigation.getParam('anh', 'abc') }}></Image>
                    <Text>Tên sản phẩm: {navigation.getParam('otherParam', 'null')}</Text>
                    <Text>Loại: {navigation.getParam('loai', 'null')}</Text>
                    <Text>Giá: {navigation.getParam('gia', 'null')} VND</Text>
                    <View style={{borderTopWidth:1, width:"100%"}}>
                        <Text style={{fontSize:25}}>Thông tin sản phẩm:</Text>
                        <Text style={{fontSize:20, fontStyle:'italic'}}>{navigation.getParam('ghichu', 'chưa có thông tin chi tiết cho sản phẩm này')}</Text>
                    </View>
                </View>
                <View style={styles.button}>
                    <Button uppercase={false} title='Đặt mua sản phẩm' onPress={() => {
                        navigation.navigate('AddCart', {
                            id:navigation.getParam('id'),
                            tensp:navigation.getParam('otherParam')
                        })
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
import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, FlatList, Alert, Image, Button } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class FoodScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Đồ ăn",
            headerRight: (
                <Button
                    title="Log"
                    onPress={() => navigation.navigate("Login",
                        {
                            title: "Đăng nhập",
                        }
                    )}
                />
            ),
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: false,
        }
    }

    navigateToLogin(navigation) {
        this.props.navigation.navigate("Login");
    }

    GetFlatListItem(id,nameitem, anh, loai, gia, ghichu) {
        this.props.navigation.navigate("Detail", {
            id: id,
            otherParam: nameitem,
            anh: anh,
            loai: loai,
            gia: gia,
            ghichu:ghichu
        });
    }

    componentDidMount() {
        return fetch('http://192.168.1.36:8888/MyShop/getfood.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    refreshing: false,
                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderItem(ten, loai, hinhanh) {
        <View>
            <Text>{ten}</Text>
            <Text>{loai}</Text>
            <Text>{hinhanh}</Text>
        </View>
    }
    handleRefresh = () =>{
        this.setState({
            refreshing:true
        },() => {
            this.componentDidMount();
        }
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.MainContainer}>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 10, borderWidth: 1,borderRadius:5, borderColor: "#123dfd", alignItems: 'center' }}>
                            <Image onPress={this.GetFlatListItem.bind(this, item.TenSp)} style={styles.image} source={{ uri: item.HinhAnh }} />
                            <Text style={styles.text} onPress={this.GetFlatListItem.bind(this,item.Id, item.TenSp, item.HinhAnh, item.Loaisp, item.Gia, item.Ghichu)}> {item.TenSp} </Text>
                            <Text style={styles.text}> {item.Loaisp} </Text>
                            <Text style={styles.text}> {item.Gia} VND </Text>
                        </View>
                    )
                    }
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    refreshing = {this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({

    MainContainer: {
      justifyContent: 'center',
      flex: 1,
      paddingTop: 5,
      backgroundColor: "#A3FFA3"
    },
  
    FlatListItemStyle: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    text: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    item: {
      borderWidth: 1
    },
    image: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 150,
      width: 150.
    },
  });
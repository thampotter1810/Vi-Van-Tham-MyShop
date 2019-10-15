import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, FlatList, RefreshControl, Image, Button } from 'react-native';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default class AllItemScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'A Nested Details Screen'),
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: false,
        }
    }

    componentDidMount() {
        this.setState({isLoading:false});
        return fetch('http://192.168.1.36:8888/MyShop/getAllItem.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    refreshing:false
                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    GetFlatListItem(id, tennguoi, sdt, diachi, nameitem, anh, loai, gia) {
        // this.props.navigation.navigate("DetailCart");

        this.props.navigation.navigate("DetailAdmin", {
            itemId: id,
            otherParam: nameitem,
            anh: anh,
            loai: loai,
            gia: gia,
            id: id,
            tennguoi: tennguoi,
            sdt: sdt,
            diachi: diachi,
        });
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
                        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => { this.GetFlatListItem.bind(this, item.TenSp, item.HinhAnh, item.Loaisp, item.Gia) }}>
                            <View style={styles.view}>
                                <Text style={{ margin: 5 }}>{item.Id}</Text>
                                <Image style={styles.image} source={{ uri: item.HinhAnh }} />
                                <Text style={styles.text} onPress={
                                    this.GetFlatListItem.bind(this, item.Id, item.TenNguoiMua, item.Sdt, item.DiaChi, item.TenSp, item.HinhAnh, item.Loaisp, item.Gia)
                                }
                                > {item.TenSp} </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )

                    }
                    keyExtractor={(item, index) => index}
                    refreshing = {this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
            </View>
        )
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
        fontSize: 25
    },
    item: {
        borderWidth: 1
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50.
    },
    view: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#B2FAFF',
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        borderWidth: 1,
        borderColor: "black",
        alignItems: 'center'
    }
});

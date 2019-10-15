import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, Dimensions, FlatList, Button, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { ScrollView } from 'react-native-gesture-handler';


export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Trang chủ",
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
      dataSource: null,
      selectedIndex: 0
    }
  }

  GetFlatListItem(nameitem, anh, loai, gia, ghichu) {
    this.props.navigation.navigate("Detail", {
      itemId: 86,
      otherParam: nameitem,
      anh: anh,
      loai: loai,
      gia: gia,
      ghichu: ghichu,
    });
  }

  async componentDidMount() {
    return fetch('http://192.168.1.36:8888/MyShop/getfood.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  // FlatListItemSeparator = () => {
  //   return (
  //     <View
  //       style={{
  //         borderWidth:1,
  //         width: "100%",
  //         backgroundColor: "#607D8B",
  //       }}
  //     />
  //   );
  // }

  renderItem(ten, loai, hinhanh) {
    <View>
      <Text>{ten}</Text>
      <Text>{loai}</Text>
      <Text>{hinhanh}</Text>
    </View>
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    let sanpham = this.state.dataSource.map((val, key) => {
      const image = [{
        img: val.HinhAnh
      }]
      const DEVICE_WIDTH = Dimensions.get("window").width;
      const { selectedIndex } = this.state
      return <View key={key} style={styles.item}>
        <ScrollView horizontal pagingEnabled>
          <Image key={image} source={{ uri: val.HinhAnh }}></Image>
        </ScrollView>
      </View>
    })
    return (

      <View style={styles.MainContainer}>
        {sanpham}
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
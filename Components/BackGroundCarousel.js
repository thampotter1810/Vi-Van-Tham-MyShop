import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, FlatList, Alert, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import DetailScreen from './DetailScreen';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Trang chủ',
    headerStyle: {
      backgroundColor: '#5B7FFF',
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
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

  componentDidMount() {
    return fetch('http://192.168.12.106:8888/MyShop/bannerhot.php')
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
    return (
      <View style={styles.MainContainer}>
        <BackGroundCarousel />
      </View>
    );
  }
}

const stackNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Detail: { screen: DetailScreen },
},
  {   
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#5B7FFF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(stackNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
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
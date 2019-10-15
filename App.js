import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './Components/HomeScreen';
import FoodScreen from './Components/FoodScreen';
import DrinkScreen from './Components/DrinkScreen';
import AddScreen from './Components/AddScreen';
import AllItemScreen from './Components/AllItemScreen';
import DetailAdminScreen from './Components/DetailAdminScreen';
import DetailCart from './Components/DetailCart';
import DetailScreen from './Components/DetailScreen';
import InforCardScreen from './Components/InforCardScreen';
import LoginScreen from './Components/LoginScreen';
import UpdateScreen from './Components/UpdateScreen';
import AddCartScreen from './Components/AddCartScreen';

const stackNavigatorLogin = createStackNavigator({
  Login: { screen: LoginScreen },
  InforCard: { screen: InforCardScreen },
  AllItem: { screen: AllItemScreen }
},
  {
    initialRouteName: 'Login',
    /* The header config from HomeScreen is now here */
    headerMode: "none"
  }
);

// const stackNavigatorAdd = createStackNavigator({
//   Add: { screen: AddScreen },

// },
//   {
//       initialRouteName: 'Add',
//       /* The header config from HomeScreen is now here */
//       defaultNavigationOptions: {
//           headerStyle: {
//               backgroundColor: '#5B7FFF',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//               fontWeight: 'bold',
//           },
//       },
//       headerMode: "none"
//   }
// );

// const stackNavigatorAllItem = createStackNavigator({
//   AllItem: { screen: AllItemScreen},
//   DetailAdmin: { screen: DetailAdminScreen },
// },
//   {
//       initialRouteName: 'AllItem',
//       /* The header config from HomeScreen is now here */

//       headerMode: "none"
//   }
// );

// const stackNavigatorDetailAdmin = createStackNavigator({
//   DetailAdminScreen: { screen: DetailAdminScreen },
//   Add: { screen: AddScreen },
// },
//   {
//       initialRouteName: 'DetailAdminScreen',
//       /* The header config from HomeScreen is now here */
//       defaultNavigationOptions: {
//           headerStyle: {
//               backgroundColor: '#5B7FFF',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//               fontWeight: 'bold',
//           },
//       },
//       headerMode: "none"
//   }
// );

const stackNavigatorDrink = createStackNavigator({
  Drink: { screen: DrinkScreen },
  Detail: { screen: DetailScreen },
  Login: { screen: stackNavigatorLogin },
  AllItemScreen: { screen: AllItemScreen },
  DetailAdmin: { screen: DetailAdminScreen },
  AddScreen: { screen: AddScreen },
  DetailCart: { screen: DetailCart },
  InforCart: { screen: InforCardScreen },
  Update: { screen: UpdateScreen },
  AddCart: { screen: AddCartScreen },
},
  {
    initialRouteName: 'Drink',
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

const stackNavigatorFood = createStackNavigator({
  Food: { screen: FoodScreen },
  Detail: { screen: DetailScreen },
  Login: { screen: stackNavigatorLogin },
  AllItemScreen: { screen: AllItemScreen },
  DetailAdmin: { screen: DetailAdminScreen },
  AddScreen: { screen: AddScreen },
  DetailCart: { screen: DetailCart },
  InforCart: { screen: InforCardScreen },
  Update: { screen: UpdateScreen },
  AddCart: { screen: AddCartScreen },
},
  {
    initialRouteName: 'Food',
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

const stackNavigatorHome = createStackNavigator({
  Home: { screen: HomeScreen },
  Detail: { screen: DetailScreen },
  Login: { screen: stackNavigatorLogin },
  AllItemScreen: { screen: AllItemScreen },
  DetailAdmin: { screen: DetailAdminScreen },
  AddScreen: { screen: AddScreen },
  DetailCart: { screen: DetailCart },
  InforCart: { screen: InforCardScreen },
  Update: { screen: UpdateScreen },
  AddCart: { screen: AddCartScreen },
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


// InforCart: {screen: stackNavigatorInforCart},
//   DetailADmin: {screen: stackNavigatorDetailAdmin},
//   AllItem: {screen: stackNavigatorAllItem},
//   Login: {screen: stackNavigatorLogin},
//   Add: {screen: stackNavigatorAdd},


const TabNavigator = createBottomTabNavigator({
  Home: { screen: stackNavigatorHome },
  Food: { screen: stackNavigatorFood },
  Drink: { screen: stackNavigatorDrink },
},
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default class Home extends React.Component {
  render() {
    return <AppContainer />;
  }
}

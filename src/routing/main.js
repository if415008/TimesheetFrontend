import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import mainScreen from '../screens/main'
import createScreen from '../screens/create'
import detailScreen from '../screens/detail'
import editScreen from '../screens/edit'
import profileScreen from '../screens/profile'
import exportScreen from '../screens/exportTimesheet'

const HeaderStyle = () => ({
  headerStyle: {
    backgroundColor: '#006183'
  }
})

const MainTab = createMaterialTopTabNavigator({
  MainTab: {
    screen: mainScreen,
    navigationOptions: (props) => ({
      title: "Welcome, \n Fill Your Timesheet!!"
    })
  }
},
  {
    lazy: true,
    optimizationsEnabled: true,
    tabBarOptions: {
      activeTintColor: '#1f1f1f',
      inactiveBackgroundColor: '#F00',
      inactiveTintColor: '#afafaf',

      labelStyle: {
        // color:"#1f1f1f", 
        fontSize: 14,
        paddingVertical: 1
      },
      pressColor: '#afafaf',
      indicatorStyle: {
        backgroundColor: '#cc1219',
      },
      style: {
        backgroundColor: '#FFFFFF',
      },
      tabStyle: {
        // marginBottom:2,
        // backgroundColor: '#FFFFFF'
      }
    }
  });

export default Main = createStackNavigator({
  MainScreen: {
    screen: MainTab
  },
  ProfileScreen: {
    screen: profileScreen
  },
  ExportScreen: {
    screen: exportScreen
  },
  EditScreen: {
    screen: editScreen
  }
},
  {
    initialRouteName: "MainScreen",
    defaultNavigationOptions: HeaderStyle,
  });

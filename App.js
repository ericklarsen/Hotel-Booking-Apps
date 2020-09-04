import React, { Component } from 'react';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createMaterialTopTabNavigator
  } from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons'
import { Image, Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import LindexScreen from './Views/login/start';
import LloginScreen from './Views/login/login';
import LregisterScreen from './Views/login/register';
// import HhomeScreen from './Views/guest/homeScreen';
import HSAccountScreen from './Views/guest/account/account';
import HSAccountScreen_detail from './Views/guest/account/account_detail';
import HSHomeScreen from './Views/guest/home/home'
import HSHomeScreen_hotel from './Views/guest/home/booking_hotel'
import HSHomeScreen_hotel_list from './Views/guest/home/booking_hotel_list'
import HSHomeScreen_hotel_list_detail from './Views/guest/home/booking_hotel_list_detail'
import HSHomeScreen_hotel_list_form from './Views/guest/home/booking_hotel_list_form'
import HSHomeScreen_hotel_list_result from './Views/guest/home/booking_hotel_list_result'
import HSHomeScreen_meeting_room from './Views/guest/home/booking_meeting_room'
import HSHomeScreen_meeting_room_list from './Views/guest/home/booking_meeting_room_list'
import HSHomeScreen_meeting_room_list_detail from './Views/guest/home/booking_meeting_room_list_detail'
import HSHomeScreen_meeting_room_list_form from './Views/guest/home/booking_meeting_room_list_form'
import HSHomeScreen_meeting_room_list_result from './Views/guest/home/booking_meeting_room_list_result'
import HSBookingScreen from './Views/guest/booking/booking'
import HSBookingScreen_Konfirmasi from './Views/guest/booking/booking_konfirmasi'
import HSBooking_Meeting_Screen from './Views/guest/booking/booking_meeting_room'
import { Colors } from 'react-native-paper';
 

// const HShome = createStackNavigator({

// })

// const HSbooking = createStackNavigator({

// })

const HSaccount = createStackNavigator({
    index: { screen : HSAccountScreen },
    account_detail : { screen : HSAccountScreen_detail}
},
{
    initialRouteName: 'index'
})

const HShome = createStackNavigator({
    index: { screen : HSHomeScreen },
    backIndex: { screen : HSHomeScreen },
    hotel_room : { screen : HSHomeScreen_hotel },
    hotel_room_list : { screen : HSHomeScreen_hotel_list},
    hotel_room_list_detail : { screen : HSHomeScreen_hotel_list_detail},
    hotel_room_list_form : { screen : HSHomeScreen_hotel_list_form},
    hotel_room_list_result : { screen : HSHomeScreen_hotel_list_result},
    meeting_room : { screen : HSHomeScreen_meeting_room},
    meeting_room_list : { screen : HSHomeScreen_meeting_room_list},
    meeting_room_list_detail : { screen : HSHomeScreen_meeting_room_list_detail},
    meeting_room_list_form : { screen : HSHomeScreen_meeting_room_list_form},
    meeting_room_list_result : { screen : HSHomeScreen_meeting_room_list_result},
},
{
    initialRouteName: 'index'
})

const HSbooking = createStackNavigator({
    index: { screen : HSBookingScreen },
    booking_konfirmasi : { screen : HSBookingScreen_Konfirmasi}
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})

const HSbooking_meeting = createStackNavigator({
    index: { screen : HSBooking_Meeting_Screen },
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})


const HSbooking_top = createMaterialTopTabNavigator({
    booking_hotel_room : {screen : HSbooking,
        navigationOptions:{
            tabBarLabel : 'Room Hotel',
        }
    },

    booking_meeting_room : {screen : HSbooking_meeting,
        navigationOptions:{
            tabBarLabel : 'Meeting Room / Grand Ballroom',
        }
    },
        
},
{
    initialRouteName: 'booking_hotel_room',
    tabBarOptions: {
        activeTintColor : '#DF4A00',
        inactiveTintColor: 'grey',
        labelStyle: {
          fontSize: 10,
        },
        style: {
          backgroundColor: 'white',
        },
      },
}
)

const HSbooking_final = createStackNavigator({
    index: { screen : HSbooking_top },
},{
    navigationOptions: {
        headerTintColor : 'white',
        headerStyle:{
            backgroundColor: '#DF4A00',
        },
        headerTitle:(<Image style={{width:'42%', height: '42%', flex: 1}} resizeMode="center" source={require('./assets/cluster2.png')}/>)
    }
})

const homeStack =  createBottomTabNavigator  ({
    Home: { screen: HShome,
        navigationOptions:{
            tabBarLabel : 'Home',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-home" color = {tintColor} size={20}/>
            )
        }
    },
    Booking: { screen : HSbooking_final,
        navigationOptions:{
            tabBarLabel : 'My Booking',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-book" color = {tintColor} size={20}/>
            )
        }
    },
    Contact: { screen : HSaccount,
        navigationOptions:{
            tabBarLabel : 'My Account',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-contact" color = {tintColor} size={20}/>
            )
        }
    }
},
{
    tabBarOptions : {
        activeTintColor : '#DF4A00',
        inactiveTintColor: 'grey',
        style: {
            backgroundcolor: 'white'
        }
        
    },
    activeTintColor : '#DF4A00',initialRouteKey: 'Home', initialRouteName: 'Home'
});

const loginStack = createStackNavigator({
    index: { screen : LindexScreen },
    login: { screen : LloginScreen},
    register: {screen : LregisterScreen},
    toHomeStack : { screen : homeStack}
},
{
    navigationOptions:{
        header: null
    }
});

export default loginStack;
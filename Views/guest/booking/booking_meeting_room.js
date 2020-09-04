import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, Image, ScrollView, ListView, ActivityIndicator , TouchableOpacity, Alert,RefreshControl,AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from "moment";
import Swiper from 'react-native-swiper';
import {ImagePicker, Permissions, Constants} from 'expo';
import CurrencyFormatter from "react-native-currency-formatter";

export default  class booking_meeting_room extends Component {
    static navigationOptions = {
        headerTintColor : 'white',
        headerStyle:{
            backgroundColor: '#DF4A00',
        },
        headerTitle:(<Image style={{width:'42%', height: '42%', flex: 1}} resizeMode="center" source={require('../assets/cluster2.png')}/>)
        
}

constructor(props){
    super(props)
    //set value in state for initial date
    this.state = {
        isLoading: true,
        refreshing: true,
        username: ''
    }
    
    AsyncStorage.getItem('username', (error, result) => {
        if (result) {
            this.setState({
                username: result
            });
        }
    })
}


componentDidMount(){
    AsyncStorage.getItem('username', (error, result) => {
        if (result) {
            return fetch('http://192.168.100.28/swissbel/view_booking_meeting_room.php'
            ,{
                method: 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    username : result,
                })
            }
            ).then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson == 'failed'){
                        this.setState({
                            isLoading: false,
                            dataSource: '',
                            refreshing: false,
                        },function(){})
                    }else{
                        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
                        this.setState({
                            isLoading: false,
                            dataSource: ds.cloneWithRows(responseJson),
                            refreshing: false,
                        },function(){})
                    }
                }).catch((error)=>{
                    console.error(error);
                }) 
        }
    })
    let username_guest = this.state.username
    // 192.168.100.2 10.220.13.28
    
}


status(status_meeting_room_booking){
    if(status_meeting_room_booking == 'pending'){
        return <View style ={{height: 25, width: 70, backgroundColor: '#FFD000', justifyContent:'center', alignItems: 'center'}}>
        <Text style= {{fontSize: 12, fontWeight: '700',color: 'white'}}>
              {status_meeting_room_booking}
        </Text>
        </View>
    }else if(status_meeting_room_booking == 'success'){
        return <View style ={{height: 25, width: 70, backgroundColor: '#00AB40', justifyContent:'center', alignItems: 'center'}}>
        <Text style= {{fontSize: 12, fontWeight: '700',color: 'white'}}>
              {status_meeting_room_booking}
        </Text>
        </View>
    }else{
        return <View style ={{height: 25, width: 70, backgroundColor: '#DE1700', justifyContent:'center', alignItems: 'center'}}>
        <Text style= {{fontSize: 12, fontWeight: '700',color: 'white'}}>
              {status_meeting_room_booking}
        </Text>
        </View>
    }
}

toCancel = (id_meeting_room,startdate,id_meeting_room_booking) =>{

    let bulan1 = moment(startdate).format('MMMM')
    let tanggal1 = moment(startdate).format('DD')

      fetch('http://192.168.100.28/swissbel/booking_meeting_room_delete.php',{
  method: 'POST',
  headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
  },
  body: JSON.stringify({
      id_meeting_room : id_meeting_room,
      id_meeting_room_booking: id_meeting_room_booking,
      username_guest : 'erick',
      bulan1: bulan1,
      tanggal1 : tanggal1,
  })
}).then((response) => response.json())
.then((responseJson) => {
  if(responseJson == 'failed'){
      Alert.alert('Quantity Of Room Does not Available')
  }else{
  this.props.navigation.replace('index')}
}).catch((error) =>{
  console.error(error);
})
  // Alert.alert(bulan1+" ,"+bulan2)

  
}

toCheck = () =>{
    if(this.state.dataSource == ''){
        return <View style={{marginTop: 20, justifyContent: 'center', alignItems: 'center', flex:1}}>
            <Text style = {{fontSize: 14, color: 'grey', fontStyle: 'italic'}}>
            No bookings are being made.
            </Text>
        </View>
    }else{
        return <View style = {{ marginTop: 20}}>
                    <ListView
                dataSource = {this.state.dataSource}
                renderRow = {(rowData) => 
                      <View style = {{
                          borderWidth : 0.5,
                          flex: 1,
                          marginHorizontal: 20,
                          borderColor: '#dddddd',
                          borderRadius: 5,
                          backgroundColor: '#f6f6f6',
                          marginTop: 10,
                          paddingVertical: 20
                      }}

                      >
                          <View style = {{alignItems : 'center'}}>
                          <View style = {{borderBottomWidth: 0.5, borderBottomColor: 'grey',width: '90%'}}>
                          <View style = {{flexDirection: 'row', justifyContent: 'space-between',paddingBottom: 12, }}>
                            <View style = {{justifyContent: 'center',}}>                         
                                <Text style= {{fontSize: 12,color: 'grey'}}>
                                    Booking ID :
                                </Text>
                                <Text style= {{fontSize: 16, fontWeight: '700',color: '#DF4A00'}}>
                                {rowData.id_meeting_room_booking}
                                </Text>
                            </View>  

                            <View style = {{justifyContent: 'center',}}>                         
                                <Text style= {{fontSize: 12,color: 'grey'}}>
                                    Room Name :
                                </Text>
                                <Text style= {{fontSize: 16, fontWeight: '700',color: '#DF4A00'}}>
                                {rowData.nama_meeting_room}
                                </Text>
                            </View>  
                          {this.status(rowData.status_meeting_room_booking)}
                          </View>    
                            </View>

                          </View>
                          <View style = {{flexDirection: 'row', justifyContent: 'space-between',marginTop: 8, paddingHorizontal: 20}}>
                              <View>
                            <Text style = {{fontSize: 11,color: 'grey', fontWeight: 'bold'}}>
                            Date of The Event
                            </Text>
                            <Text style = {{fontSize: 11,color: 'grey'}}>
                            {moment(rowData.tanggalStart_meeting_room_booking).format('dddd, DD MMM YYYY')}
                            </Text>
                              </View>

                              <View>
                            <Text style = {{fontSize: 11,color: 'grey', fontWeight: 'bold'}}>
                            Category
                            </Text>
                            <Text style = {{fontSize: 11,color: 'grey'}}>
                            {rowData.kategori_meeting_room_booking}
                            </Text>
                              </View>

                              <View>
                            <Text style = {{fontSize: 11,color: 'grey', fontWeight: 'bold'}}>
                            Price
                            </Text>
                            <Text style = {{fontSize: 11,color: 'grey'}}>
                            { CurrencyFormatter(parseInt(rowData.biaya_meeting_room_booking)) }                            
                            </Text>
                              </View>

                                </View>

                                <View style = {{flexDirection: 'row', justifyContent: 'flex-start',marginTop: 8, paddingHorizontal: 20}}>
                              <View>
                            <Text style = {{fontSize: 11,color: 'grey', fontWeight: 'bold'}}>
                            Description
                            </Text>
                            <Text style = {{fontSize: 11,color: 'grey'}}>
                            {rowData.deskripsi_meeting_room_booking}
                            </Text>
                              </View>

                                </View>

                                <View style = {{alignItems: 'center', marginTop: 13,}}>
                                <View
                                style = {{width: '90%', height: 30,justifyContent: 'center', alignItems: 'center'}}
                                >
                                    <Text style = {{fontSize: 12, color: 'grey', fontWeight: 'bold', fontStyle: 'italic'}}>
                                    *Please waiting for our Sales Manager to Calling you.
                                    </Text>
                                    </View>

                                </View>
                                <View style = {{alignItems: 'center', marginTop: 13,}}>
                                        <TouchableOpacity
                                    style = {{width: '90%', height: 30, backgroundColor: '#DC0202', justifyContent: 'center', alignItems: 'center', marginTop: 5,}}
                                    onPress = {this.toCancel.bind(this,
                                        rowData.id_meeting_room,
                                        rowData.tanggalStart_meeting_room_booking,
                                        rowData.id_meeting_room_booking
                                    )}
                                    >
                                        <Text style = {{fontSize: 12, color: 'white', fontWeight: 'bold'}}>Cancel Booking</Text>
                                        </TouchableOpacity>
                                </View>
                                
                            
                          
                          
                      </View>
                }/>
                      
                    </View>
    }
}
  
toConfirm = (id_meeting_room_booking) =>{
    this.props.navigation.navigate('booking_konfirmasi',{
        id_meeting_room_booking : id_meeting_room_booking
    })
}

_onRefresh = () => {
  this.componentDidMount();
}

    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            )

        }
      return (
          <View style = {styles.container}>
              <View>

                  <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                    />
                  }
                scrollEventThrottle = {16}
              >
                    {this.toCheck()}
                  
              </ScrollView>
              </View>
          </View>
      )
    }
}


const styles = StyleSheet.create ({
    container : {
        flex : 1,
        backgroundColor: 'white',
        
    },
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    }
})
import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, Image, ScrollView, ListView, ActivityIndicator , TouchableOpacity, Alert,RefreshControl,AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from "moment";
import Swiper from 'react-native-swiper';
import {ImagePicker, Permissions, Constants} from 'expo';

export default  class booking extends Component {
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
    
}

componentDidMount(){
  AsyncStorage.getItem('username', (error, result) => {
      if (result) {
          
        return fetch('http://192.168.100.28/swissbel/view_booking.php'
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
  });
    // 192.168.100.2 10.220.13.28
   
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
                  {rowData.id_hotel_room_booking}
                  </Text>
              </View>  

              <View style = {{justifyContent: 'center',}}>                         
                  <Text style= {{fontSize: 12,color: 'grey'}}>
                      Room Name :
                  </Text>
                  <Text style= {{fontSize: 16, fontWeight: '700',color: '#DF4A00'}}>
                  {rowData.nama_hotel_room}
                  </Text>
              </View>  
            {this.status(rowData.status_hotel_room_booking)}
            </View>    
              </View>

            </View>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between',marginTop: 8, paddingHorizontal: 20}}>
                <View>
              <Text style = {{fontSize: 11,color: 'grey', fontWeight: 'bold'}}>
              Check-in date : 
              </Text>
              <Text style = {{fontSize: 11,color: 'grey'}}>
              {moment(rowData.tanggalStart_hotel_room_booking).format('dddd, DD MMM YYYY')}
              </Text>
                </View>

                <View>
              <Text style = {{fontSize: 11,color: 'grey', fontWeight: 'bold'}}>
              Check-out date : 
              </Text>
              <Text style = {{fontSize: 11,color: 'grey'}}>
              {moment(rowData.tanggalEnd_hotel_room_booking).format('dddd, DD MMM YYYY')}
              </Text>
                </View>

                <View>
              <Text style = {{fontSize: 11,color: 'grey', fontWeight: 'bold'}}>
              Room(s) : 
              </Text>
              <Text style = {{fontSize: 11,color: 'grey'}}>
              {rowData.total_hotel_room_booking} room(s)
              </Text>
                </View>
                  </View>
              
                  {this.cekPembayaran(rowData.status_hotel_room_booking,rowData.id_hotel_room,rowData.pembayaran_hotel_room_booking,rowData.tanggalStart_hotel_room_booking,
                    rowData.tanggalEnd_hotel_room_booking, rowData.total_hotel_room_booking,rowData.id_hotel_room_booking)}
                  
              
            
            
        </View>
  }/>
        
      </View>
  }
}

// fetchData(){
//     return fetch('http://192.168.100.7/swissbel/view_booking.php'
//     ,{
//         method: 'POST',
//         headers : {
//             'Accept' : 'application/json',
//             'Content-Type' : 'application/json'
//         },
//         body: JSON.stringify({
//             username : 'erick',
//         })
//     }
//     ).then((response) => response.json())
//         .then((responseJson) => {
//             if(responseJson == 'failed'){
//                 Alert.alert('Room is Not Available On This Date')
//                 this.props.navigation.navigate ('hotel_room');
//             }else{
//                 let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
//                 this.setState({
//                     isLoading: false,
//                     dataSource: ds.cloneWithRows(responseJson)
//                 },function(){})
//             }
//         }).catch((error)=>{
//             console.error(error);
//         })
// }

status(status_hotel_room_booking){
    if(status_hotel_room_booking == 'pending'){
        return <View style ={{height: 25, width: 70, backgroundColor: '#FFD000', justifyContent:'center', alignItems: 'center'}}>
        <Text style= {{fontSize: 12, fontWeight: '700',color: 'white'}}>
              {status_hotel_room_booking}
        </Text>
        </View>
    }else if(status_hotel_room_booking == 'success'){
        return <View style ={{height: 25, width: 70, backgroundColor: '#00AB40', justifyContent:'center', alignItems: 'center'}}>
        <Text style= {{fontSize: 12, fontWeight: '700',color: 'white'}}>
              {status_hotel_room_booking}
        </Text>
        </View>
    }else{
        return <View style ={{height: 25, width: 70, backgroundColor: '#DE1700', justifyContent:'center', alignItems: 'center'}}>
        <Text style= {{fontSize: 12, fontWeight: '700',color: 'white'}}>
              {status_hotel_room_booking}
        </Text>
        </View>
    }
}


toCancel = (id_hotel_room,startdate,enddate,total_hotel_room_booking,id_hotel_room_booking) =>{

        let bulan1 = moment(startdate).format('MMMM')
        let bulan2 = moment(enddate).format('MMMM')
        let tanggal1 = moment(startdate).format('DD')
        let tanggal2 = moment(enddate).format('DD')

          fetch('http://192.168.100.28/swissbel/booking_hotelroom_delete.php',{
      method: 'POST',
      headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
          id_hotel_room : id_hotel_room,
          id_hotel_room_booking: id_hotel_room_booking,
          username_guest : 'erick',
          bulan1: bulan1,
          bulan2 : bulan2,
          tanggal1 : tanggal1,
          tanggal2: tanggal2,
          total_hotel_room_booking : total_hotel_room_booking
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

uploadPicture = async (id_hotel_room_booking) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });
      
      console.log(result);
      let localUri = result.uri;
      let filename = localUri.split('/').pop();
      console.log(filename);
  
      if (!result.cancelled) {
        this.setState({
            srcImg: result.uri,
            uri: result.uri,
            fileName: filename
          });
      }
      console.log(this.state.uri);

    console.log('mulai upload');
    this.setState  ({isLoading : true })
    const data = new FormData();
    //data.append('id', 'id apa saja'); // you can append anyone.
    data.append('fileToUpload', {
      uri: this.state.uri,
      type: 'image/jpeg',
      name: this.state.fileName,
    });
    data.append('id_hotel_room_booking',id_hotel_room_booking);
    const url= "http://192.168.100.28/swissbel/booking_hotelroom_konfirmasi.php"
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    //   body : JSON.stringify({
    //     id_hotel_room : this.state.id_hotel_room
    //  }),data
    })
    .then((response) => response.json())
    .then((responseJson) =>
      {
        if(responseJson =='failed'){
          Alert.alert('Please Retry To Upload The Proof of Payment ')
        }else{
          Alert.alert('Upload success! Please waiting for our receptionist validation.')          
        console.log(responseJson);
        this.setState  ({
            isLoading : false,
           })
        }
      });
  }

  cekPembayaran (status,id_hotel_room,pembayaran,startdate,enddate,total_hotel_room_booking,id_hotel_room_booking) {
      if(status == 'pending' && pembayaran == 'bank'){
        return <View style = {{alignItems: 'center', marginTop: 13,}}>
        <TouchableOpacity
        style = {{width: '90%', height: 30, backgroundColor: '#00AB40', justifyContent: 'center', alignItems: 'center'}}
        onPress = {this.uploadPicture.bind(this,
            id_hotel_room_booking
        )}>
            <Text style = {{fontSize: 12, color: 'white', fontWeight: 'bold'}}>Upload Proof Of Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity
        style = {{width: '90%', height: 30, backgroundColor: '#DC0202', justifyContent: 'center', alignItems: 'center', marginTop: 5,}}
        onPress = {this.toCancel.bind(this,
            id_hotel_room,
            startdate,
            enddate,
            total_hotel_room_booking,
            id_hotel_room_booking
        )}>
            <Text style = {{fontSize: 12, color: 'white', fontWeight: 'bold'}}>Cancel Booking</Text>
            </TouchableOpacity>
        </View>
      } else if(status == 'success' && pembayaran =='bank'){
        return <View style = {{alignItems: 'center', marginTop: 13,}}>
        <View
        style = {{width: '90%', justifyContent: 'center',}}>
            <Text style = {{fontSize: 11, color: 'grey', fontWeight: 'normal', fontStyle:'italic'}}>* Your payment has been successfully validated. Please show the booking code at the receptionist.  </Text>
            </View>
        </View>
      }else if(status == 'completed'){
        return <View style = {{alignItems: 'center', marginTop: 13,}}>
        <View
        style = {{width: '90%', justifyContent: 'center',}}>
            <Text style = {{fontSize: 11, color: 'grey', fontWeight: 'normal', fontStyle:'italic'}}>* This booking has been completed.</Text>
            </View>
        </View>
      }else if(status == 'pending' && pembayaran == 'hotel'){
        return <View style = {{alignItems: 'center', marginTop: 13,}}>
        <View
        style = {{width: '90%', justifyContent: 'center',}}>
            <Text style = {{fontSize: 11, color: 'grey', fontWeight: 'normal', fontStyle:'italic'}}>* Please show the booking code to the receptionist for payment.</Text>
            </View>
        </View>
      }else if(status == 'success' && pembayaran =='hotel'){
        return <View style = {{alignItems: 'center', marginTop: 13,}}>
        <View
        style = {{width: '90%', justifyContent: 'center',}}>
            <Text style = {{fontSize: 11, color: 'grey', fontWeight: 'normal', fontStyle:'italic'}}>* Payment has been completed.</Text>
            </View>
        </View>
      }
  }

toConfirm = (id_hotel_room_booking) =>{
    this.props.navigation.navigate('booking_konfirmasi',{
        id_hotel_room_booking : id_hotel_room_booking
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
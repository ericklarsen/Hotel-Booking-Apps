import React, { Component } from 'react';
import { Dimensions, Text, View, TouchableOpacity, Alert, Image, ListView, ActivityIndicator,ScrollView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import moment from "moment";
import Swiper from 'react-native-swiper';
import { Icon } from 'react-native-elements'
import CurrencyFormatter from "react-native-currency-formatter";

export default class booking_meeting_room_list_detail extends Component{
    static navigationOptions = {
        headerTintColor : 'white',
        headerStyle:{
            backgroundColor: '#DF4A00'
        },
        title: 'Meeting Room Detail'
}

    constructor(props){
        super(props)
        //set value in state for initial date
        this.state = {
            startdate: '',
            id_meeting_room : this.props.navigation.state.params.id_meeting_room,
            isLoading : true,
            kategori: ''
        }
    }
    
    toBook = (startdate,id_meeting_room,nama_meeting_room,harga_meeting_room) =>{
        this.props.navigation.navigate('meeting_room_list_form',{
            startdate : startdate,
            id_meeting_room : id_meeting_room,
            nama_meeting_room : nama_meeting_room,
            harga_meeting_room : harga_meeting_room,
            kategori : this.state.kategori
        })
    }

    componentDidMount(){
        this.setState({
            startdate: this.props.navigation.state.params.startdate,
            kategori: this.props.navigation.state.params.kategori,
        })
        // 192.168.100.2 10.220.13.28
        return fetch('http://192.168.43.176/swissbel/view_meeting_rooms_detail.php'
        ,{
            method: 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
               id_meeting_room : this.state.id_meeting_room
            })
        }
        ).then((response) => response.json())
            .then((responseJson) => {
                // if(responseJson == 'failed'){
                //     Alert.alert('Room Not Available')
                //     this.props.navigation.navigate ('meeting_room');
                // }else{
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
                    this.setState({
                        isLoading: false,
                        dataSource: ds.cloneWithRows(responseJson),
                        dataSource2: responseJson
                    },function(){})
                // }
            }).catch((error)=>{
                console.error(error);
            })
    }
    // startdate,enddate,namaroom,kapasitasroom,hargaroom
    toForm(){
        this.props.navigation.navigate('meeting_room_list_form')
    }
    

    // toAlert = () =>{
    //     Alert.alert(this.state.startdate, this.state.enddate)
    // }

    render() {
        let startdate = moment(this.state.startdate).format('dddd, YYYY-MM-DD');
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            )

        }
      return (
          <View style={{flex : 1, backgroundColor: 'white',}}>

<View style={{height: 220, justifyContent: 'center', alignItems:'center',resizeMode : 'cover',}}>
        
        <Swiper autoplay={true} showsPagination={false} containerStyle={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} >
        
        {this.state.dataSource2.map((Object) => (
                <Image key={Object.gambar_meeting_room} style={{height: 220, width: '100%',}} source={{uri: 'http://192.168.43.176/swissbel_admin/assets_upload/meeting_room/'+Object.gambar_meeting_room}} />

                  ))} 
                  {this.state.dataSource2.map((Object) => (
                <Image key={Object.gambar2_meeting_room} style={{height: 220, width: '100%',}} source={{uri: 'http://192.168.43.176/swissbel_admin/assets_upload/meeting_room/'+Object.gambar2_meeting_room}} />

                  ))} 
                  {this.state.dataSource2.map((Object) => (
                <Image key={Object.gambar3_meeting_room} style={{height: 220, width: '100%',}} source={{uri: 'http://192.168.43.176/swissbel_admin/assets_upload/meeting_room/'+Object.gambar3_meeting_room}} />

                  ))} 
      </Swiper>
                </View> 
                
                <ListView
                dataSource = {this.state.dataSource}
                renderRow = {(rowData) => 
                    <View style = {{padding: 20}}>
                        <Text style = {{ fontSize : 20, fontWeight: '500', color : '#DF4A00'}}>{rowData.nama_meeting_room}</Text>

                    <View style={{marginTop: 5,marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                        <Text style = {{ fontSize: 14, fontWeight: 'bold', color : 'grey', marginTop: 5}}>Guest :  </Text>
                        <Text style = {{ fontSize: 12, color : 'grey', marginTop: 5}}>Max {rowData.kapasitas_meeting_room} People/Room </Text>
                        </View>
                        <View>
                        <Text style = {{ fontSize: 14, fontWeight: 'bold', color : 'grey', marginTop: 5}}>Room Size :  </Text>
                        <Text style = {{ fontSize: 12, color : 'grey', marginTop: 5}}>{rowData.luas_meeting_room} M2 </Text>
                        </View>
                    </View>
                    <View style = {{borderTopColor: 'grey', borderTopWidth: 0.5,marginBottom: 15}}>
                        <Text style = {{marginTop:13, fontSize : 16, fontWeight: '500', color : '#DF4A00'}}>Main Facilities</Text>
                        <View style={{marginTop: 5,marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name='ios-wine' type='ionicon'color='#517fa4'/> 
                                <Text style = {{marginLeft:7, fontSize: 12, color : 'grey', marginTop: 5}}> Breakfast</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name='ios-wifi' type='ionicon'color='#517fa4'/> 
                                <Text style = {{marginLeft:7, fontSize: 12, color : 'grey', marginTop: 5}}> Free WiFi</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name='ios-globe' type='ionicon'color='#517fa4'/> 
                                <Text style = {{marginLeft:7, fontSize: 12, color : 'grey', marginTop: 5}}> Internet Access</Text>
                            </View>
                        </View>
                        <View style = {{borderTopColor: 'grey', borderTopWidth: 0.5,}}>
                            <Text style = {{marginTop:13, fontSize : 16, fontWeight: '500', color : '#DF4A00'}}>Room Facilities</Text>
                                <View style={{marginTop: 5,marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style = {{fontSize: 12, color : 'grey', marginTop: 5}}>{rowData.fasilitas_meeting_room}</Text>
                                </View>
                        </View>
                    </View>
                    
                    
                    </View>
                // <Image style={{height: 220, width: '100%',}} source={{uri: 'http://10.220.13.28/swissbel_admin/assets_upload/meeting_room/'+ rowData.gambar_meeting_room}} />
                }/>
            <View style = {{backgroundColor:'white', bottom: 0, position: 'absolute', borderColor: 'black', width: '100%', borderWidth: 0.5, height: 80, justifyContent: 'center'}}>
                <ListView
                dataSource = {this.state.dataSource}
                renderRow = {(rowData) =>
                        <View style={{marginTop: 8,alignItems:'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
                            <View>
                                <Text style = {{color: 'grey', fontSize: 12}}>
                                    Price/Room/Day Starts From
                                </Text>
                                <Text style = {{color: '#DF4A00', fontSize: 21, fontWeight: 'bold',marginTop: 3}}>
                                { CurrencyFormatter(parseInt(rowData.harga_meeting_room)) }
                                </Text>
                                <Text style = {{color: 'grey', fontSize: 12, fontWeight: 'bold',marginTop: 3}}>
                                        Inclusives Taxes
                                </Text>
                            </View>
                            <TouchableOpacity onPress={this.toBook.bind(this,
                                    this.state.startdate,
                                    this.state.id_meeting_room,
                                    rowData.nama_meeting_room,
                                    rowData.harga_meeting_room,
                                )} style = {{alignItems: 'center', justifyContent: 'center',width: 100, height: 40, backgroundColor: '#DF4A00',}}>
                                <Text style = {{fontSize: 13, fontWeight: 'bold',color: 'white'}}>
                                    Select Room
                                </Text>
                            </TouchableOpacity>
                            
                        </View>
                }/>
          </View>
          </View>
      )
    }
}
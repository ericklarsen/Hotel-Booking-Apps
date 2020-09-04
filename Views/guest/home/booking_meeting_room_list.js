import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, Image, ListView, ActivityIndicator,ScrollView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import moment from "moment";
import CurrencyFormatter from "react-native-currency-formatter";

export default class booking_meeting_room_list extends Component{
    static navigationOptions = {
        headerTintColor : 'white',
        headerStyle:{
            backgroundColor: '#DF4A00'
        },
        title: 'Meeting Room List'
}

    constructor(props){
        super(props)
        //set value in state for initial date
        this.state = {
            startdate: this.props.navigation.state.params.startdate,
            value: '',
            isLoading : true,
            total: null,
            harga: '',
            tanggal1 :this.props.navigation.state.params.tanggal1,
            bulan1: this.props.navigation.state.params.bulan1,
            kategori : ''
        }
    }
    
    toDetail = (startdate,id_meeting_room,value) =>{
        this.props.navigation.navigate('meeting_room_list_detail',{
            startdate : startdate,
            id_meeting_room : id_meeting_room,
            value : value,
            kategori : this.state.kategori
        })
    }

    componentDidMount(){
        this.setState({
            value: this.props.navigation.state.params.value,
            total : this.props.navigation.state.params.total,
            kategori : this.props.navigation.state.params.kategori
            
        })
        // 192.168.100.2 10.220.13.28
        return fetch('http://192.168.100.28/swissbel/view_meeting_rooms.php'
        ,{
            method: 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                tanggal1 : this.state.tanggal1,
                bulan1 : this.state.bulan1,
            //    startdate : this.state.startdate,
            //    enddate: this.state.enddate,
            //    tanggal1 : this.state.tanggal1,
            //    tanggal2 : this.state.tanggal2,
            //    bulan1 : this.state.bulan1,
            //    bulan2 : this.state.bulan2
            })
        }
        ).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson == 'failed'){
                    Alert.alert('Room is Not Available On This Date')
                    this.props.navigation.navigate ('meeting_room');
                }else{
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
                    this.setState({
                        isLoading: false,
                        dataSource: ds.cloneWithRows(responseJson)
                    },function(){})
                }
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
        let startdate = moment(this.state.startdate).format('dddd, DD MMM YYYY');
        
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            )

        }
      return (
          <View style={{flex : 1, backgroundColor: 'white'}}>

            <View style={{marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
                <Text style = {{fontSize: 25, fontWeight: '700'}}>Meeting Room List</Text>
                <Text style = {{fontSize: 11, color: 'grey', marginTop: 5}}>Date : {startdate}</Text>
                <Text> {this.state.total} </Text>
            </View>
            <View style={{flex: 1, marginTop : 30, width : 350, marginLeft: 20}}>
           
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {(rowData) =>
                    <View 
                    style = {{
                        flexDirection: 'row',
                        width:'100%',
                        height: 170,
                        borderColor : 'grey',
                        borderWidth : 0.5,
                        marginBottom: 20,
                    }}>
                            <View style= {{flex: 2}}>
                                <Image source={{uri: 'http://192.168.100.28/swissbel_admin/assets_upload/meeting_room/'+ rowData.gambar_meeting_room}} style ={{flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                            </View>
                            <View style= {{flex:2, paddingLeft:15, paddingTop: 10}}>
                                <Text style = {{fontSize : 16, fontWeight: '500', color: '#DF4A00'}}>
                                {rowData.nama_meeting_room} 
                                </Text>
                                <Text style = {{fontSize: 12, marginTop:5, color: 'grey'}}>
                                Capacity : {rowData.kapasitas_meeting_room} people / room
                                </Text>
                                <Text style = {{fontSize: 13, fontWeight:'bold' ,marginTop: 5 ,color: '#DF4A00'}}>
                                { CurrencyFormatter(parseInt(rowData.harga_meeting_room)) }/ Day
                                </Text>
                                <View style = {{
                                    bottom: 0, position: 'absolute', marginBottom: 15, paddingRight: 10,alignSelf: 'flex-end', }}>
                                <TouchableOpacity style = {{width: 80, height: 25,
                                    backgroundColor: '#DF4A00', borderRadius: 40,justifyContent: 'center', alignItems: 'center'
                                }}
                                
                                onPress = {this.toDetail.bind(this,
                                    this.state.startdate,
                                    rowData.id_meeting_room,
                                    this.state.value
                                    )}
                                    >
                                        <Text style = {{textAlign: 'center', fontSize : 10, color: 'white'}}>See the detail</Text>
                                </TouchableOpacity>
                                </View>
                            </View>

                    </View>
                }
              />

            </View>

              <View style = {{marginTop: 40, justifyContent: 'center', alignItems: 'center'}}>
              </View>
          </View>
      )
    }
}
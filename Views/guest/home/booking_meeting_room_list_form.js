import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, Image, ListView,Picker, ActivityIndicator,TextInput, KeyboardAvoidingView, Platform,AsyncStorage} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import moment from "moment";
import { Header } from 'react-navigation';
import NumericInput from 'react-native-numeric-input'
import CurrencyFormatter from "react-native-currency-formatter";

export default class booking_hotel_list_form extends Component{
    static navigationOptions = {
        headerTintColor : 'white',
        headerStyle:{
            backgroundColor: '#DF4A00'
        },
        title: 'Booking Form'
}

    constructor(props){
        super(props)
        //set value in state for initial date
        this.state = {
            startdate: '',
            fullname : '',
            deskripsi : '',
            nohp : '',
            harga_meeting_room:'',
            kapasitas_meeting_room:'',
            nama_meeting_room:'',
            id_meeting_room:'',
            status: 'pending',
            kategori: '',
            username : ''
        }

        AsyncStorage.getItem('username', (error, result) => {
            if (result) {
                this.setState({
                    username: result
                });
            }
        });
    }

    componentDidMount(){
        this.setState({
            startdate: this.props.navigation.state.params.startdate,
            id_meeting_room: this.props.navigation.state.params.id_meeting_room,
            nama_meeting_room: this.props.navigation.state.params.nama_meeting_room,
            harga_meeting_room: this.props.navigation.state.params.harga_meeting_room,
            kategori: this.props.navigation.state.params.kategori,
        })
    }
    // startdate,enddate,id_meeting_room,nama_meeting_room_booking,kapasitas_meeting_room,biaya_meeting_room_booking,total_meeting_room_bookingvalue,namalengkap_meeting_room_booking,hp_meeting_room_booking, total
    toBooking = (nama_meeting_room_booking, tanggalStart_meeting_room_booking
        , biaya_meeting_room_booking, namalengkap_meeting_room_booking,
        status_meeting_room_booking, bulan1,tanggal1) =>{

            if(this.state.nohp == 0 || namalengkap_meeting_room_booking == ''){
                Alert.alert('Please Fill Your Fullname and Contact Person')
            }else{
                fetch('http://192.168.100.28/swissbel/booking_meeting_room.php',{
            method: 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id_meeting_room : this.state.id_meeting_room,
                username_guest : this.state.username,
                tanggalStart_meeting_room_booking: this.state.startdate,
                biaya_meeting_room_booking: this.state.harga_meeting_room,
                namalengkap_meeting_room_booking: this.state.fullname,
                hp_meeting_room_booking: this.state.nohp,
                status_meeting_room_booking: 'pending',
                kategori: this.state.kategori,
                deskripsi: this.state.deskripsi,
                bulan1 : bulan1,
                tanggal1 : tanggal1
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson == 'failed'){
                Alert.alert('Quantity Of Room Does not Available')
            }else{
                Alert.alert(responseJson)
            this.props.navigation.navigate('meeting_room_list_result',{
                nama_meeting_room_booking : nama_meeting_room_booking,
                tanggalStart_meeting_room_booking: tanggalStart_meeting_room_booking,
                biaya_meeting_room_booking :biaya_meeting_room_booking,
                namalengkap_meeting_room_booking : namalengkap_meeting_room_booking,
                status_meeting_room_booking : status_meeting_room_booking,
                kategori : this.state.kategori
            })}
        }).catch((error) =>{
            console.error(error);
        })
            // Alert.alert(bulan1+" ,"+bulan2)
        
            }

        // this.props.navigation.navigate('meeting_room_list_form'
        // ,{
        //     startdate : startdate,
        //     enddate : enddate,
        //     id_meeting_room : id_meeting_room,
        //     nama_meeting_room : nama_meeting_room,
        //     kapasitas_meeting_room : kapasitas_meeting_room,
        //     harga_meeting_room : harga_meeting_room,
        //     value : value,
        //     fullname: fullname,
        //     nohp: nohp
        // }
        // )
        // 192.168.100.2 10.220.13.28
        
    }

    render() {
        let startdate = moment(this.state.startdate).format('dddd, DD MMM YYYY');
        
        let bulan1 = moment(this.state.startdate).format('MMMM')
        let tanggal1 = moment(this.state.startdate).format('DD')
      return (
          <KeyboardAvoidingView style={{flex : 1, backgroundColor: 'white'}} behavior="position">

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style = {{justifyContent:'flex-start', alignItems:'center', flexDirection:'row', width : '100%', height: 60, backgroundColor: '#EEEEEE'}}>
                    <Text style= {{fontSize: 19, fontWeight: '500', marginLeft: 20, color: '#464646'}}>
                        Your Booking
                    </Text>
                </View>

                <View style = {{justifyContent:'flex-start', alignItems:'center', flexDirection:'row', width : '100%', height: 60, borderBottomColor: 'grey', borderBottomWidth: 0.5}}>
                    <View style = {{flexDirection: 'column'}}>
                        <Text style= {{marginLeft: 20, fontSize: 12, fontWeight: 'normal', color: '#747474'}}>
                            Room Name
                        </Text>
                        <Text style= {{marginLeft: 20, fontSize: 16, fontWeight: 'bold', color: '#DF4A00'}}>
                            {this.state.nama_meeting_room}
                        </Text>
                    </View>
                </View>

                <View style = {{justifyContent:'space-between', flexDirection: 'row',padding: 20,width : '100%', height: 80, borderBottomColor: 'grey', borderBottomWidth: 0.5}}>
                    <View style = {{flexDirection:'column'}}>
                        <Text style= {{fontSize: 16, fontWeight: 'bold', color: '#747474'}}>
                            Date of The Event
                        </Text>
                        <Text style= {{fontSize: 12, fontWeight: 'normal', color: '#747474'}}>
                            {startdate}
                        </Text>
                    </View>
                </View>
                
                
            </View>

            <View style={{padding: 20}}>
                <Text style = {{fontSize: 20, fontWeight: 'bold', color: '#DF4A00', marginBottom: 15}}>
                    Fill In Contact Details
                </Text>
                <TextInput
                placeholder = 'Fullname'
                
                onChangeText = {TextInputValue => this.setState({fullname: TextInputValue})}
                style = {{
                    width : '100%',
                    height: 40,
                    borderColor : 'grey',
                    borderBottomWidth: 0.5,
                }}
                />

                <TextInput
                placeholder = 'Phone Number'
                keyboardType='numeric'
                onChangeText = {TextInputValue => this.setState({nohp: TextInputValue})}
                style = {{
                    width : '100%',
                    height: 40,
                    borderColor : 'grey',
                    borderBottomWidth: 0.5,
                    marginTop: 7
                }}
                />

                <TextInput
                placeholder = 'Short Description About The Event'
                onChangeText = {TextInputValue => this.setState({deskripsi: TextInputValue})}
                style = {{
                    width : '100%',
                    height: 80,
                    borderColor : 'grey',
                    borderBottomWidth: 0.5,
                    marginTop: 7
                }}
                />
                
            </View>
            

              <View style = {{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity 
              
            //   onPress = {this.toBooking.bind(this,
            //     this.state.this.state.startdate,
            //     this.state.enddate,
            //     this.nama_meeting_room,
            //     this.kapasitas_meeting_room,
            //     this.harga_meeting_room,
            //     this.state.value,
            //     this.state.fullname,
            //     this.state.nohp
            //     )}
            onPress = {this.toBooking.bind(this,
                this.state.nama_meeting_room,
                this.state.startdate,
                this.state.harga_meeting_room,
                this.state.fullname,
                this.state.status,
                bulan1,
                tanggal1
                )}
              style={{borderWidth: 0.5, borderRadius: 100, width: 180, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#DF4A00', borderColor: 'white'}}>
                  <Text style={{fontSize: 16, fontWeight: '700' , color : 'white'}}> Make a Booking </Text>
              </TouchableOpacity>
              </View>
          </KeyboardAvoidingView >
      )
    }
}
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert,ActivityIndicator,Image,AsyncStorage } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import NumericInput from 'react-native-numeric-input'
import moment from "moment";
import CurrencyFormatter from "react-native-currency-formatter";

export default class booking_hotel_list_result extends Component{
    static navigationOptions = {
        headerTintColor : 'white',
        headerLeft: null,
        headerStyle:{
            backgroundColor: '#DF4A00'
        },
        title: 'Result',
}

    constructor(props){
        super(props)
        //set value in state for initial date
        this.state = {
            tanggalStart_meeting_room_booking: '',
            biaya_meeting_room_booking: '',
            namalengkap_meeting_room_booking: '',
            status_meeting_room_booking: '',
            nama_meeting_room_booking: '',
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
            nama_meeting_room_booking : this.props.navigation.state.params.nama_meeting_room_booking,
            tanggalStart_meeting_room_booking: this.props.navigation.state.params.tanggalStart_meeting_room_booking,
            biaya_meeting_room_booking: this.props.navigation.state.params.biaya_meeting_room_booking,
            namalengkap_meeting_room_booking: this.props.navigation.state.params.namalengkap_meeting_room_booking,
            status_meeting_room_booking: this.props.navigation.state.params.status_meeting_room_booking,
            kategori: this.props.navigation.state.params.kategori,
        })   
    }

    toHome= () =>{
        this.props.navigation.replace('backIndex')
    }

    render() {
        let startdate = moment(this.state.startdate).format('dddd, DD MMM YYYY');
        
        // let data = [{
        //     value: '1 Night',
        //   }, {
        //     value: '2 Night',
        //   },
        //   {
        //     value: '3 Night',
        //   },
        //   {
        //     value: '4 Night',
        //   },
        //   {
        //     value: '5 Night',
        //   },
        //   {
        //     value: '6 Night',
        //   },
        //   {
        //     value: '7 Night',
        //   },];
      return (
          <View style={{flex : 1, backgroundColor: 'white'}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style = {{justifyContent: 'center',flexDirection:'column', width : '100%', height: 80, backgroundColor: '#00AB40'}}>
                    <Text style= {{fontSize: 19, fontWeight: '500', marginLeft: 20, color: 'white'}}>
                        Booking Success!
                    </Text>
                    <Text style= {{fontSize: 12, marginLeft: 20, color: 'white'}}>
                        Please Transfer Your Booking Fee (Max 1 Day After Your Booking Success)
                    </Text>
                </View>

                <View style = {{justifyContent:'flex-start', alignItems:'center', flexDirection:'row', width : '100%', height: 60, borderBottomColor: 'grey', borderBottomWidth: 0.5}}>
                    <View style = {{flexDirection: 'column'}}>
                        <Text style= {{marginLeft: 20, fontSize: 12, fontWeight: 'normal', color: '#747474'}}>
                            Room Name
                        </Text>
                        <Text style= {{marginLeft: 20, fontSize: 16, fontWeight: 'bold', color: '#DF4A00'}}>
                            {this.state.nama_meeting_room_booking}
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

                    <View style = {{flexDirection:'column'}}>
                        <Text style= {{fontSize: 16, fontWeight: 'bold', color: '#747474'}}>
                            Price
                        </Text>
                        <Text style= {{fontSize: 12, fontWeight: 'normal', color: '#747474'}}>
                        { CurrencyFormatter(parseInt(this.state.biaya_meeting_room_booking))}
                        </Text>
                    </View>
                    
                    <View style = {{flexDirection:'column'}}>
                        <Text style= {{fontSize: 16, fontWeight: 'bold', color: '#747474'}}>
                            Category
                        </Text>
                        <Text style= {{fontSize: 12, fontWeight: 'normal', color: '#747474'}}>
                        {this.state.kategori}
                        </Text>
                    </View>

                    </View>

                <View style = {{justifyContent:'center', alignItems: 'center',padding: 20,width : '100%', height: 80, borderBottomColor: 'grey', borderBottomWidth: 0.5}}>
                <Text style = {{fontStyle: 'italic'}}>
                    *Please waiting for our Sales Manager to Call you.
                </Text>
                </View>
                
              <View style = {{marginTop: 40, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity 
              onPress = {this.toHome}
              style={{borderWidth: 0.5, borderRadius: 80, width: 200, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#DF4A00', borderColor: 'white'}}>
                  <Text style={{fontSize: 14, fontWeight: '700' , color : 'white'}}> Back To Home </Text>
              </TouchableOpacity>
              </View>
            </View>

             
              

          </View>
      )
    }
}
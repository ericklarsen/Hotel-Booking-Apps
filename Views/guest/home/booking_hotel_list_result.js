import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert,ActivityIndicator,Image } from 'react-native';
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
            tanggalStart_hotel_room_booking: '',
            tanggalEnd_hotel_room_booking: '',
            biaya_hotel_room_booking: '',
            total_hotel_room_booking: '',
            namalengkap_hotel_room_booking: '',
            status_hotel_room_booking: '',
            pembayaran_hotel_room_booking: '',
            nama_hotel_room_booking: ''
        }
    }    

    componentDidMount(){
        this.setState({
            nama_hotel_room_booking : this.props.navigation.state.params.nama_hotel_room_booking,
            tanggalStart_hotel_room_booking: this.props.navigation.state.params.tanggalStart_hotel_room_booking,
            tanggalEnd_hotel_room_booking: this.props.navigation.state.params.tanggalEnd_hotel_room_booking,
            biaya_hotel_room_booking: this.props.navigation.state.params.biaya_hotel_room_booking,
            durasi_hotel_room_booking: this.props.navigation.state.params.durasi_hotel_room_booking,
            total_hotel_room_booking: this.props.navigation.state.params.total_hotel_room_booking,
            namalengkap_hotel_room_booking: this.props.navigation.state.params.namalengkap_hotel_room_booking,
            status_hotel_room_booking: this.props.navigation.state.params.status_hotel_room_booking,
            pembayaran_hotel_room_booking: this.props.navigation.state.params.pembayaran_hotel_room_booking,
        })   
    }

    paymentname= () =>{
        if(this.state.pembayaran_hotel_room_booking == 'bank'){
            return <Text>Bank Payment</Text>

        }else{
            return <Text>In Hotel Payment</Text>

        }
    }

    payment= () =>{
        if(this.state.pembayaran_hotel_room_booking == 'bank'){
            return <View style = {{width : '100%', height: 190, borderBottomColor: 'grey', borderBottomWidth: 0.5}}>
                    <View style = {{justifyContent:'center',alignItems: 'center', backgroundColor : '#00AB40', height: 60}}>
                    <Text style = {{fontSize : 18, fontWeight: '500', color: 'white'}}>Our Bank Account</Text>
                    <Text style = {{fontSize : 11, fontWeight: 'normal', color: 'white',}}>Please choose one account for the transfer</Text>
                    </View>

                    <View style = {{padding: 20,flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Image source={require('../assets/bcalogo.jpg')} style ={{width: 100, height: 50}} />
                            <Text style = {{fontWeight: 'bold', fontSize: 16}}>144445551</Text>
                            <Text style = {{marginTop: 3,fontWeight: 'normal', fontSize: 12}}>A/N PT. SwissBelinn</Text>
                        </View>
                        <View>
                            <Image source={require('../assets/mandirilogo.jpg')} style ={{width: 100, height: 50}} />
                            <Text style = {{fontWeight: 'bold', fontSize: 16}}>3331101122</Text>
                            <Text style = {{marginTop: 3,fontWeight: 'normal', fontSize: 12}}>A/N PT. SwissBelinn</Text>
                        </View>
                    </View>
                </View>

        }else{
            return <View style = {{width : '100%', height: 190}}>
                <View style = {{justifyContent:'center',alignItems: 'center', backgroundColor : '#00AB40', height: 60}}>
                <Text style = {{fontSize : 18, fontWeight: '500', color: 'white'}}>In Hotel Payment</Text>
                <Text style = {{fontSize : 11, fontWeight: 'normal', color: 'white',}}>Please go to our receptionist in hotel and show your booking</Text>
                </View>
            </View>
        }
    }

    toHome= () =>{
        this.props.navigation.replace('backIndex')
    }

    render() {
        let startdate = moment(this.state.startdate).format('dddd, DD MMM YYYY');
        let enddate = moment(this.state.enddate).format('dddd, DD MMM YYYY');
        
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
                            {this.state.nama_hotel_room_booking}
                        </Text>
                    </View>
                </View>

                <View style = {{justifyContent:'space-between', flexDirection: 'row',padding: 20,width : '100%', height: 80, borderBottomColor: 'grey', borderBottomWidth: 0.5}}>
                    <View style = {{flexDirection:'column'}}>
                        <Text style= {{fontSize: 16, fontWeight: 'bold', color: '#747474'}}>
                            Check-in
                        </Text>
                        <Text style= {{fontSize: 12, fontWeight: 'normal', color: '#747474'}}>
                            {startdate}
                        </Text>
                    </View>

                    <View style = {{flexDirection:'column'}}>
                        <Text style= {{fontSize: 16, fontWeight: 'bold', color: '#747474'}}>
                            Check-out
                        </Text>
                        <Text style= {{fontSize: 12, fontWeight: 'normal', color: '#747474'}}>
                            {enddate}
                        </Text>
                    </View>

                    <View style = {{flexDirection:'column'}}>
                        <Text style= {{fontSize: 16, fontWeight: 'bold', color: '#747474'}}>
                            Duration
                        </Text>
                        <Text style= {{fontSize: 12, fontWeight: 'normal', color: '#747474'}}>
                            {this.state.durasi_hotel_room_booking} Night
                        </Text>
                    </View>
                    </View>

                <View style = {{justifyContent:'space-between', flexDirection: 'row',padding: 20,width : '100%', height: 80, borderBottomColor: 'grey', borderBottomWidth: 0.5}}>
                    <View style = {{flexDirection:'column'}}>
                        <Text style= {{fontSize: 16, fontWeight: 'bold', color: '#747474'}}>
                            Price
                        </Text>
                        <Text style= {{fontSize: 12, fontWeight: 'normal', color: '#747474'}}>
                        { CurrencyFormatter(parseInt(this.state.biaya_hotel_room_booking * this.state.total_hotel_room_booking * this.state.durasi_hotel_room_booking))}
                        </Text>
                    </View>

                    <View style = {{flexDirection:'column'}}>
                        <Text style= {{fontSize: 16, fontWeight: 'bold', color: '#747474'}}>
                            Room(s)
                        </Text>
                        <Text style= {{fontSize: 12, fontWeight: 'normal', color: '#747474'}}>
                        {this.state.total_hotel_room_booking} room(s)
                        </Text>
                    </View>
                    <View style = {{flexDirection:'column'}}>
                        <Text style= {{fontSize: 16, fontWeight: 'bold', color: '#747474'}}>
                            Payment
                        </Text>
                        <Text style= {{fontSize: 12, fontWeight: 'normal', color: '#747474'}}>
                        {this.paymentname()}
                        </Text>
                    </View>
                </View>

                {this.payment()}

                
                
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
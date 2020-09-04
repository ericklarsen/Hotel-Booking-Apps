import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, Image, ListView,Picker, ActivityIndicator,TextInput,AsyncStorage } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import moment from "moment";
import NumericInput from 'react-native-numeric-input'
import CurrencyFormatter from "react-native-currency-formatter";

export default class booking_hotel_list_room extends Component{
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
            enddate: '',
            malam: '',
            fullname : '',
            nohp : '',
            total:'1',
            harga_hotel_room:'',
            kapasitas_hotel_room:'',
            nama_hotel_room:'',
            id_hotel_room:'',
            status: 'pending',
            pembayaran: 'bank',
            tanggal_awal: '',
            tanggal_akhir: '',
            bulan : '',
            username: ''
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
            enddate: this.props.navigation.state.params.enddate,
            durasi_inap: this.props.navigation.state.params.durasi,
            id_hotel_room: this.props.navigation.state.params.id_hotel_room,
            nama_hotel_room: this.props.navigation.state.params.nama_hotel_room,
            harga_hotel_room: this.props.navigation.state.params.harga_hotel_room,
        })
    }
    // startdate,enddate,id_hotel_room,nama_hotel_room_booking,kapasitas_hotel_room,biaya_hotel_room_booking,total_hotel_room_bookingvalue,namalengkap_hotel_room_booking,hp_hotel_room_booking, total
    toBooking = (bulan,tanggal_awal,tanggal_akhir,nama_hotel_room_booking, tanggalStart_hotel_room_booking,
        tanggalEnd_hotel_room_booking, biaya_hotel_room_booking, durasi_hotel_room_booking,total_hotel_room_booking,
        namalengkap_hotel_room_booking, status_hotel_room_booking,pembayaran_hotel_room_booking,bulan1,bulan2,tanggal1,tanggal2) =>{

            if(this.state.nohp == 0 || namalengkap_hotel_room_booking == ''){
                Alert.alert('Please Fill Your Fullname and Contact Person')
            }else{
                fetch('http://192.168.100.28/swissbel/booking_hotelroom.php',{
            method: 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                bulan : bulan,
                tanggal_awal : tanggal_awal,
                tanggal_akhir : tanggal_akhir,
                id_hotel_room : this.state.id_hotel_room,
                username_guest : this.state.username,
                tanggalStart_hotel_room_booking: this.state.startdate,
                tanggalEnd_hotel_room_booking: this.state.enddate,
                biaya_hotel_room_booking: this.state.harga_hotel_room * this.state.durasi_inap * this.state.total,
                total_hotel_room_booking: this.state.total,
                namalengkap_hotel_room_booking: this.state.fullname,
                hp_hotel_room_booking: this.state.nohp,
                status_hotel_room_booking: 'pending',
                pembayaran_hotel_room_booking : this.state.pembayaran,
                bulan1: bulan1,
                bulan2 : bulan2,
                tanggal1 : tanggal1,
                tanggal2: tanggal2,
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson == 'failed'){
                Alert.alert('Quantity Of Room Does not Available')
            }else{
            this.props.navigation.navigate('hotel_room_list_result',{
                nama_hotel_room_booking : nama_hotel_room_booking,
                tanggalStart_hotel_room_booking: tanggalStart_hotel_room_booking,
                tanggalEnd_hotel_room_booking : tanggalEnd_hotel_room_booking,
                durasi_hotel_room_booking : durasi_hotel_room_booking,
                biaya_hotel_room_booking :biaya_hotel_room_booking,
                total_hotel_room_booking :total_hotel_room_booking,
                namalengkap_hotel_room_booking : namalengkap_hotel_room_booking,
                status_hotel_room_booking : status_hotel_room_booking,
                pembayaran_hotel_room_booking : pembayaran_hotel_room_booking
            })}
        }).catch((error) =>{
            console.error(error);
        })
            // Alert.alert(bulan1+" ,"+bulan2)
        
            }

        // this.props.navigation.navigate('hotel_room_list_form'
        // ,{
        //     startdate : startdate,
        //     enddate : enddate,
        //     id_hotel_room : id_hotel_room,
        //     nama_hotel_room : nama_hotel_room,
        //     kapasitas_hotel_room : kapasitas_hotel_room,
        //     harga_hotel_room : harga_hotel_room,
        //     value : value,
        //     fullname: fullname,
        //     nohp: nohp
        // }
        // )
        // 192.168.100.2 10.220.13.28
        
    }

    render() {
        let startdate = moment(this.state.startdate).format('dddd, DD MMM YYYY');
        let enddate = moment(this.state.enddate).format('dddd, DD MMM YYYY');
        let tanggal_awal = moment(this.state.startdate).format('DD');
        let tanggal_akhir = moment(this.state.enddate).format('DD');
        let bulan = moment(this.state.enddate).format('MMMM');

        
        let bulan1 = moment(this.state.startdate).format('MMMM')
        let bulan2 = moment(this.state.enddate).format('MMMM')
        let tanggal1 = moment(this.state.startdate).format('DD')
        let tanggal2 = moment(this.state.enddate).format('DD')

      return (
          <View style={{flex : 1, backgroundColor: 'white'}}>

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
                            {this.state.nama_hotel_room}
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
                            {this.state.durasi_inap} Night
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
                 <View style ={{ marginTop:7, flexDirection: 'row', alignItems :'center'}}>
                    <NumericInput
                    value={parseInt(this.state.total)}
                    onChange={total => this.setState({total})} 
                    totalWidth={120} 
                    totalHeight={40} 
                    iconSize={25}
                    step={1}
                    minValue = {1}
                    valueType='integer'
                    textColor='grey'  />
                    
                    <Text style={{color:'grey', marginLeft: 10}}>
                        Room
                    </Text>

                    <Text style={{color:'grey', marginLeft: 10, fontWeight: 'bold'}}>
                    { CurrencyFormatter(parseInt(this.state.harga_hotel_room * this.state.durasi_inap * this.state.total)) } 
                    </Text>
                    </View>

                    <View style = {{marginTop: 10}}>
                        <Text style={{fontSize: 14, color:'#DF4A00',fontWeight: 'bold'}}>
                            Select your payment
                        </Text>
                        <View style = {{marginTop: 5, flexDirection: 'row', alignItems: 'center'}}>
                        <Picker
                        selectedValue={this.state.pembayaran}
                        style={{height: 50, width: 250, color:'grey',
                        borderBottomWidth: 0.5,}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({pembayaran: itemValue})
                        }>
                            
                        <Picker.Item label="Bank Payment" value="bank" />
                        <Picker.Item label="In Hotel Payment" value="hotel" />
                        </Picker>
                        </View>

                    </View>
                
            </View>
            

              <View style = {{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity 
              
            //   onPress = {this.toBooking.bind(this,
            //     this.state.this.state.startdate,
            //     this.state.enddate,
            //     this.nama_hotel_room,
            //     this.kapasitas_hotel_room,
            //     this.harga_hotel_room,
            //     this.state.value,
            //     this.state.fullname,
            //     this.state.nohp
            //     )}
            onPress = {this.toBooking.bind(this,
                bulan,
                tanggal_awal,
                tanggal_akhir,
                this.state.nama_hotel_room,
                this.state.startdate,
                this.state.enddate,
                this.state.harga_hotel_room,
                this.state.durasi_inap,
                this.state.total,
                this.state.fullname,
                this.state.status,
                this.state.pembayaran,
                bulan1,
                bulan2,
                tanggal1,
                tanggal2 
                )}
              style={{borderWidth: 0.5, borderRadius: 100, width: 180, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#DF4A00', borderColor: 'white'}}>
                  <Text style={{fontSize: 16, fontWeight: '700' , color : 'white'}}> Make a Booking </Text>
              </TouchableOpacity>
              </View>
          </View>
      )
    }
}
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert,ActivityIndicator, Image } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import NumericInput from 'react-native-numeric-input'
import moment from "moment";

export default class booking_meeting_room extends Component{
        static navigationOptions = {
            headerTintColor : 'white',
            headerStyle:{
                backgroundColor: '#DF4A00'
            },
            title: 'Booking',
    }

    constructor(props){
        super(props)
        //set value in state for initial date
        this.state = {
            startdate: moment(new Date()).format('YYYY-MM-DD'), 
            value: '',
            enddate: '',
            kategori: ''
        }
    }

    toSearch(startdate,tanggal1,bulan1){
            this.props.navigation.navigate('meeting_room_list',{
                startdate : startdate,
                tanggal1 : tanggal1,
                bulan1 : bulan1,
                kategori : this.state.kategori
            })
        
    }
    
    toKategori = (kategori) =>{
        if(kategori == 'meeting'){
            return <Image
            style = {{width:300, height:271}}
            source = {require("../assets/meeting_room.jpg")}
          />
        }else if(kategori == 'public/private'){
            return <Image
            style = {{width:300, height:271}}
            source = {require("../assets/pp_room.jpg")}
          />                
        }else{
            return <Image
            style = {{width:300, height:271}}
            source = {require("../assets/wedding_room.jpg")}
          />
        }
    }

    toKategori_acara = (kategori) =>{
        if(kategori == 'meeting'){
            return <Text style = {{fontSize: 20, color:'grey', fontWeight: '700'}}>Meeting Event</Text>
        }else if (kategori == 'wedding'){
            return <Text style = {{fontSize: 20, color:'grey', fontWeight: '700'}}>Wedding Event</Text>
        }else{
            return <Text style = {{fontSize: 20, color:'grey', fontWeight: '700'}}>Public/Private Event</Text>
        }
    }

    componentDidMount(){
        this.setState({
            kategori : this.props.navigation.state.params.kategori,
        }) 
    }
    
    render() {
        let value = this.state.value
        let startdate = this.state.startdate
        let bulan1 = moment(startdate).format('MMMM')
        let tanggal1 = moment(startdate).format('DD')
        

       
        
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
              <View style={{marginTop: 15, justifyContent: 'center', alignItems: 'center'}}>
              {this.toKategori(this.state.kategori)}
              </View>

              <View style={{width : 350, marginLeft: 20}}>
                  {/* <Dropdown
                    label='Select Type Room'
                    data={data}
                    itemPadding = {10}
                    /> */}
            {/* <Image style={{width: 50, height: 50}} source={{uri: 'http://10.220.13.28/swissbel_admin/assets_upload/hotel_room/2_mentah.jpg'}}/> */}
            <Text style = {{fontSize: 13, color: 'grey', marginTop: 10, marginBottom: 5}}> 
            Date Event
            </Text>
            <DatePicker
                    style={{width: 350}}
                    date={this.state.startdate} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    format="YYYY-MM-DD"
                    minDate={this.state.date}
                    maxDate="2019-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon= {false}
                    onDateChange={(date) => {this.setState({startdate: date})}}
                    />

                    {/* <Dropdown
                    label='Duration'
                    data={data}
                    itemPadding = {10}
                    style = {{
                        marginTop: 10
                    }}
                    /> */}

              </View>

              

              <View style = {{marginTop: 40, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity 
              onPress = {this.toSearch.bind(this,startdate, tanggal1, bulan1)}
              style={{borderWidth: 0.5, borderRadius: 40, width: 180, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#DF4A00', borderColor: 'white'}}>
                  <Text style={{fontSize: 12, fontWeight: '700' , color : 'white'}}> Search </Text>
              </TouchableOpacity>
              </View>
          </View>
      )
    }
}
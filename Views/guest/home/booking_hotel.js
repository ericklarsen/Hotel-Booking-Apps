import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert,ActivityIndicator, Image } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import NumericInput from 'react-native-numeric-input'
import moment from "moment";

export default class booking_hotel extends Component{
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
        }
    }

    toSearch(startdate,enddate,value,tanggal1,tanggal2,bulan1,bulandua){
        if(value == 0){
            Alert.alert('Please fill the duration')
        }else{
            this.props.navigation.navigate('hotel_room_list',{
                startdate : startdate,
                enddate : enddate,
                value : value,
                tanggal1 : tanggal1,
                tanggal2 : tanggal2,
                bulandua : bulandua,
                bulan1 : bulan1,
            })
        }
        
    }
    
    
    render() {
        let value = this.state.value
        let startdate = this.state.startdate
        let total = this.state.total
        let enddates = moment(startdate).add(value, 'day').format('dddd, DD MMM YYYY')
        let enddate = moment(startdate).add(value, 'day').format('YYYY-MM-DD')
        let bulan1 = moment(startdate).format('MMMM')
        let bulan2 = moment(enddate).format('MMMM')
        let tanggal1 = moment(startdate).format('DD')
        let tanggal2 = moment(enddate).format('DD')
        
        
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
              <Image
                  style = {{width:300, height:271}}
                  source = {require("../assets/hotel_room.jpg")}
                />
              </View>

              <View style={{width : 350, marginLeft: 20}}>
                  {/* <Dropdown
                    label='Select Type Room'
                    data={data}
                    itemPadding = {10}
                    /> */}
            {/* <Image style={{width: 50, height: 50}} source={{uri: 'http://10.220.13.28/swissbel_admin/assets_upload/hotel_room/2_mentah.jpg'}}/> */}
            <Text style = {{fontSize: 13, color: 'grey', marginTop: 10, marginBottom: 5}}> 
            Check-in Date
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
                        
            <View style ={{ flexDirection: 'row', alignItems :'center', justifyContent: 'space-between'}}>
                <View style ={{ flexDirection: 'column'}}>
                        <Text style = {{textAlign:'left',fontSize: 13, color: 'grey', marginTop: 10, marginBottom: 5}}> 
                        Duration
                        </Text>
                    <NumericInput
                    value={parseInt(this.state.value)}
                    onChange={value => this.setState({value})} 
                    totalWidth={120} 
                    totalHeight={40} 
                    iconSize={25}
                    step={1}
                    minValue = {1}
                    maxValue = {15}
                    valueType='integer'
                    textColor='grey'  />
                    
                    
                </View>

                <View style ={{ flexDirection: 'column'}}>
                <Text style = {{textAlign:'right',fontSize: 13, color: 'grey',}}> 
                Check-out Date
                        </Text>
                    <Text style={{color:'grey', fontWeight: 'bold', marginTop: 10}}>
                      {enddates}
                    </Text>
                </View>
                </View>
     

              </View>

              

              <View style = {{marginTop: 40, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity 
              onPress = {this.toSearch.bind(this,startdate, enddate, value, tanggal1, tanggal2, bulan1, bulan2)}
              style={{borderWidth: 0.5, borderRadius: 40, width: 180, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#DF4A00', borderColor: 'white'}}>
                  <Text style={{fontSize: 12, fontWeight: '700' , color : 'white'}}> Search </Text>
              </TouchableOpacity>
              </View>
          </View>
      )
    }
}
import React, { Component } from 'react';
import {Text, Picker, StyleSheet, SafeAreaView, TextInput, View} from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown'

class booking extends Component {
    render(){
        let data = [{
            value: 'Banana',
          }, {
            value: 'Mango',
          }, {
            value: 'Pear',
          }];
        return(
            <View style ={{
                flex: 1,backgroundColor: '#FFF7F3'}}>

            <SafeAreaView style={{backgroundColor: '#EA4000',
            width: '100%',
            height: 85,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20,}}>

            <Text style = {{fontSize: 24, fontWeight: '700', color: 'white'}}>
                Booking Form
            </Text>
            <Text style = {{fontSize: 11, color: 'white'}}>
                Fill this form for booking information 
            </Text>

            </SafeAreaView>
            
            <View style = {{marginTop: 20, marginLeft: 20}}>
                
                <Text style = {{ fontSize: 14, color: 'grey'}}>
                    Date
                </Text>

                <DatePicker style={{height: 40,width: 350, marginTop: 5, borderColor: 'grey', borderWidth: 0.3,}}
                format="YYYY-MM-DD"
                mode="date"
                placeholder="select date"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                />
                    
            <Text style = {{ fontSize: 14, color: 'grey', marginTop: 10}}>
                    Room
                </Text>

                <Dropdown
                style = {{ marginTop: 5 }}
        label='Favorite Fruit'
        data={data}
      />
            </View>


            </View>
        )
    }
}

export default booking
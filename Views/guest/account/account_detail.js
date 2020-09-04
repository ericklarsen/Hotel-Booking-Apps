import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity, TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default  class contact extends Component {
  static navigationOptions = {
    headerTintColor : 'white',
    headerStyle:{
        backgroundColor: '#DF4A00',
    },
    title : 'Account Detail'    
}

constructor(props){
    super(props)
    this.state = {
        username_guest : '',
        password_guest : '',
        email_guest : '',
        nama_guest : '',
        hp_guest : '',
    }
}

Update = () =>{
    fetch('http://192.168.100.28/swissbel/update_user.php',{
        method: 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            username_guest: this.state.username_guest,
            password_guest: this.state.password_guest,
            email_guest: this.state.email_guest,
            nama_guest: this.state.nama_guest,
            hp_guest: this.state.hp_guest,
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        if(responseJson == 'success'){
            Alert.alert('Update Data Success!');
            this.props.navigation.replace('index')
        }else{
            Alert.alert('Update Data Failed! Try Again!');
        }
       
    }).catch((error) =>{
        console.error(error);
    })
}

componentDidMount(){
    this.setState({
        username_guest: this.props.navigation.state.params.username_guest,
        password_guest: this.props.navigation.state.params.password_guest,
        email_guest: this.props.navigation.state.params.email_guest,
        nama_guest: this.props.navigation.state.params.nama_guest,
        hp_guest: this.props.navigation.state.params.hp_guest,

    })
}
    render(){
        return(
            <View style= {styles.container}>
              <View style = {{justifyContent: 'center', alignItems: 'center',backgroundColor:'white', }}>
              <View style = {{width: '90%', height: 150, borderBottomWidth: 0.5, borderBottomColor: '#B6B5B5', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                <View style = {{width: 90, height:90, borderRadius: 100, borderWidth:0, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='ios-contact' size={85} type='ionicon' color='#DF4A00'/> 
                </View>
                
                <View style={{flexDirection: 'column', justifyContent: 'center',alignItems: 'center'}}>
                <Text style = {{fontSize: 18, color: '#313131'}}>
                  {this.state.username_guest}
                </Text>
                <Text style = {{fontSize: 11, color: '#313131'}}>
                  Username
                </Text>
                </View>
              </View>

              <View style = {{width: '70%', height: 240, flexDirection:'column',}}>
              
              <View style = {{marginTop: 15}}>
              <Text style = {{fontSize: 13, color: 'grey'}}>
                  Fullname  
                </Text>
              <TextInput
                value = {this.state.nama_guest}

                onChangeText = {TextInputValue => this.setState({nama_guest: TextInputValue})}
                style = {{
                    width : '100%',
                    height: 25,
                    borderColor : 'grey',
                    borderBottomWidth: 0.5,
                }}
                />
              </View>

              <View style = {{marginTop: 15}}>
              <Text style = {{fontSize: 13, color: 'grey'}}>
                  Email  
                </Text>
              <TextInput
                value = {this.state.email_guest}
                onChangeText = {TextInputValue => this.setState({email_guest: TextInputValue})}
                style = {{
                    width : '100%',
                    height: 25,
                    borderColor : 'grey',
                    borderBottomWidth: 0.5,
                }}
                />
              </View>

              <View style = {{marginTop: 15}}>
              <Text style = {{fontSize: 13, color: 'grey'}}>
                  Phone Number  
                </Text>
              <TextInput
                value = {this.state.hp_guest}
                onChangeText = {TextInputValue => this.setState({hp_guest: TextInputValue})}
                style = {{
                    width : '100%',
                    height: 25,
                    borderColor : 'grey',
                    borderBottomWidth: 0.5,
                }}
                />
              </View>

              <View style = {{marginTop: 15}}>
              <Text style = {{fontSize: 13, color: 'grey'}}>
                  Password  
                </Text>
              <TextInput
                value = {this.state.password_guest}
                secureTextEntry={true}
                onChangeText = {TextInputValue => this.setState({password_guest: TextInputValue})}
                style = {{
                    width : '100%',
                    height: 25,
                    borderColor : 'grey',
                    borderBottomWidth: 0.5,
                }}
                />
              </View>
              
              </View>

              <TouchableOpacity
              onPress={this.Update}
              style = {{marginTop: 20,width: '90%', height: 45,justifyContent: 'center', alignItems: 'center',backgroundColor:'#DF4A00'}}>
                <Text style = {{fontSize: 15, fontWeight: 'bold', color:'white'}}>
                  Save
                </Text>
              </TouchableOpacity>
{/* 
              <View style = {{width: '90%', height: 130, borderBottomWidth: 0.5, borderBottomColor: '#B6B5B5', flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center'}}>
              <View style = {{width: 120, height:90, borderRightWidth:0.5, borderRightColor: '#B6B5B5', justifyContent: 'center', alignItems: 'center'}}>
              <View style = {{justifyContent: 'center', alignItems: 'center', backgroundColor: '#DF4A00', height: 20, width:'80%'}}>
                <Text style = {{fontSize: 11, color: 'white', fontWeight: 'bold'}}>
                  Booking Pending
                </Text>

                </View>

                <View style = {{ marginTop: 10,height: 60,width:60, borderRadius: 100, backgroundColor:'#DF4A00', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style = {{fontSize: 16, fontWeight:'bold', color: 'white'}}>
                      1
                    </Text>
                </View>

              </View>

              <View style = {{width: 120, height:90, borderRightWidth:0.5, borderRightColor: '#B6B5B5', justifyContent: 'center', alignItems: 'center'}}>
                <View style = {{justifyContent: 'center', alignItems: 'center', backgroundColor: '#DF4A00', height: 20, width:'80%'}}>
                <Text style = {{fontSize: 11, color: 'white', fontWeight: 'bold'}}>
                  Booking Success
                </Text>

                </View>

                <View style = {{ marginTop: 10,height: 60,width:60, borderRadius: 100, backgroundColor:'#DF4A00', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style = {{fontSize: 16, fontWeight:'bold', color: 'white'}}>
                      2
                    </Text>
                </View>

              </View>

              <View style = {{width: 120, height:90, borderRightWidth:0.5, borderRightColor: '#B6B5B5', justifyContent: 'center', alignItems: 'center'}}>
              <View style = {{justifyContent: 'center', alignItems: 'center', backgroundColor: '#DF4A00', height: 20, width:'80%'}}>
                <Text style = {{fontSize: 11, color: 'white', fontWeight: 'bold'}}>
                  Booking Complete
                </Text>

                </View>

                <View style = {{ marginTop: 10,height: 60,width:60, borderRadius: 100, backgroundColor:'#DF4A00', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style = {{fontSize: 16, fontWeight:'bold', color: 'white'}}>
                      2
                    </Text>
                </View>

              </View>
              </View> */}

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
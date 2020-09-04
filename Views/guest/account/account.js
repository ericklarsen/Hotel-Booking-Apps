import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,ActivityIndicator,ListView,KeyboardAvoidingView,AsyncStorage,Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default  class account extends Component {
  static navigationOptions = {
    headerTintColor : 'white',
    headerStyle:{
        backgroundColor: '#DF4A00',
    },
    headerLeft: null,
    headerTitle:(<Image style={{width:'42%', height: '42%', flex: 1}} resizeMode="center" source={require('../assets/cluster2.png')}/>)
}

constructor(props){
  super(props)
  //set value in state for initial date
  // this.state = {
  //     isLoading: true,
  //     data: ['1','2']
  // }
  this.state = {
    isLoading : true,
    username: ''
    }
}

componentDidMount(){
  
  AsyncStorage.getItem('username', (error, result) => {
    if (result) {
      return fetch('http://192.168.100.28/swissbel/view_user.php',{
        method: 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
           username_guest : result
        })
    })
          .then((response) => response.json())
          .then((responseJson) => {
              let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
              this.setState({
                  isLoading: false,
                  dataSource: responseJson
              },function(){})
          }).catch((error)=>{
              console.error(error);
          })
    }
});
}



toDetail = (username_guest,password_guest,email_guest,hp_guest,nama_guest) =>{
  this.props.navigation.navigate('account_detail',{
    username_guest: username_guest,
    password_guest : password_guest,
    email_guest: email_guest,
    hp_guest : hp_guest,
    nama_guest: nama_guest
  })
}

toLogout = () =>{
  Alert.alert('Thank you for using this Apps!')
  this.props.navigation.popToTop() 
}


    render(){
      if(this.state.isLoading){
        return(
            <View style={{flex: 1, paddingTop: 20}}>
                <ActivityIndicator/>
            </View>
        )

    }
        return(
            <KeyboardAvoidingView style= {styles.container} behavior="position">
              <View style = {{justifyContent: 'center', alignItems: 'center',backgroundColor:'white', }}>
              <View style = {{width: '90%', height: 130, borderBottomWidth: 0.5, borderBottomColor: '#B6B5B5', flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <View style = {{width: 90, height:90, borderRadius: 100, borderWidth:0, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='ios-contact' size={85} type='ionicon' color='#DF4A00'/> 
                </View>
                <View style={{marginLeft:5, flexDirection: 'column'}}>
                
                {this.state.dataSource.map((Object) => (
                <Text key = {Object.username_guest} style = {{fontSize: 20, color: '#313131', fontWeight: 'bold'}}>
                  {Object.nama_guest}
                </Text>
                      ))}

                  {this.state.dataSource.map((Object) => (
    
                    <TouchableOpacity  key = {Object.username_guest} 
                    onPress ={this.toDetail.bind(this,
                      Object.username_guest,
                      Object.password_guest,
                      Object.email_guest,
                      Object.hp_guest,
                      Object.nama_guest,
                      )} >
                  <Text style = {{fontSize: 14, color: 'grey',marginTop: 5}}>
                    Edit Profile >
                  </Text>
                  </TouchableOpacity>
                      ))}

                </View>
              </View>

              {/* <View style = {{width: '90%', height: 90, borderBottomWidth: 0.5, borderBottomColor: '#B6B5B5', flexDirection:'row', justifyContent: 'space-around', alignItems: 'center'}}>
              <View style = {{width: 120, height:'60%', borderRightWidth:0.5, borderRightColor: '#B6B5B5', justifyContent: 'center', alignItems: 'center'}}>
                <Text style = {{fontSize: 11, color: 'grey', fontWeight: 'normal'}}>
                  Booking Pending
                  </Text>      
                  <Text style = {{fontSize: 18, color: 'grey', fontWeight: 'bold'}}>
                  1
                  </Text>                        
                </View>

                <View style = {{width: 120, height:'60%', borderRightWidth:0.5, borderRightColor: '#B6B5B5', justifyContent: 'center', alignItems: 'center'}}>
                <Text style = {{fontSize: 11, color: 'grey', fontWeight: 'normal'}}>
                  Booking Success
                  </Text>      
                  <Text style = {{fontSize: 18, color: 'grey', fontWeight: 'bold'}}>
                  0
                  </Text>                        
                </View>

                <View style = {{width: 120, height:'60%',justifyContent: 'center', alignItems: 'center'}}>
                <Text style = {{fontSize: 11, color: 'grey', fontWeight: 'normal'}}>
                  Booking Complete
                  </Text>      
                  <Text style = {{fontSize: 18, color: 'grey', fontWeight: 'bold'}}>
                  5
                  </Text>                        
                </View>   
                     
  
              </View> */}
                  <TouchableOpacity
                  onPress = {this.toLogout}
                  style = {{marginTop: 20,width: '90%', height: 45,justifyContent: 'center', alignItems: 'center',backgroundColor:'#DF4A00'}}>
                    <Text style = {{fontSize: 15, fontWeight: 'bold', color:'white'}}>
                      LOG OUT
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
                </KeyboardAvoidingView>
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
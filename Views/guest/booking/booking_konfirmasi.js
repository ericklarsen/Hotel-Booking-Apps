import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, Image, ScrollView, ListView, ActivityIndicator , TouchableOpacity, Alert, } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from "moment";
import Swiper from 'react-native-swiper';

import {ImagePicker, Permissions, Constants} from 'expo';
// import ImagePicker from 'react-native-image-picker';

export default  class booking_konfirmasi extends Component {
    static navigationOptions = {
        headerTintColor : 'white',
        headerStyle:{
            backgroundColor: '#DF4A00',
        },
        title: 'Upload Bank Transfer'
        
}

constructor(props){
    super(props)
    //set value in state for initial date
    this.state = {
        isLoading: false,
        id_hotel_room_booking : this.props.navigation.state.params.id_hotel_room_booking,
        srcImg: '',
        uri: '',
        fileName: '',
    }
}

// componentDidMount(){
//     // 192.168.100.2 10.220.13.28
//     return fetch('http://10.220.13.28/swissbel/booking_hotelroom_konfirmasi.php'
//     ,{
//         method: 'POST',
//         headers : {
//             'Accept' : 'application/json',
//             'Content-Type' : 'application/json'
//         },
//         body: JSON.stringify({
//             id_hotel_room_booking : this.state.id_hotel_room_booking    ,
//         })
//     }
//     ).then((response) => response.json())
//         .then((responseJson) => {
//             if(responseJson == 'failed'){
//                 Alert.alert('Room is Not Available On This Date')
//                 this.props.navigation.navigate ('hotel_room');
//             }else{
//                 let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
//                 this.setState({
//                     isLoading: false,
//                     dataSource: ds.cloneWithRows(responseJson)
//                 },function(){})
//             }
//         }).catch((error)=>{
//             console.error(error);
//         })
// }

status(status_hotel_room_booking){
    if(status_hotel_room_booking == 'pending'){
        return <View style ={{height: 25, width: 70, backgroundColor: '#FFD000', justifyContent:'center', alignItems: 'center'}}>
        <Text style= {{fontSize: 12, fontWeight: '700',color: 'white'}}>
              {status_hotel_room_booking}
        </Text>
        </View>
    }else if(status_hotel_room_booking == 'success'){
        return <View style ={{height: 25, width: 70, backgroundColor: '#4EDE00', justifyContent:'center', alignItems: 'center'}}>
        <Text style= {{fontSize: 12, fontWeight: '700',color: 'white'}}>
              {status_hotel_room_booking}
        </Text>
        </View>
    }else{
        return <View style ={{height: 25, width: 70, backgroundColor: '#DE1700', justifyContent:'center', alignItems: 'center'}}>
        <Text style= {{fontSize: 12, fontWeight: '700',color: 'white'}}>
              {status_hotel_room_booking}
        </Text>
        </View>
    }
}

_pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    
    console.log(result);
    let localUri = result.uri;
    let filename = localUri.split('/').pop();
    console.log(filename);

    if (!result.cancelled) {
      this.setState({
          srcImg: result.uri,
          uri: result.uri,
          fileName: filename
        });
    }
  }

// _uploadImage = async () =>{
//     let result = await ImagePicker.launchCameraAsync({
//         allowsEditing: true,
//         aspect: [4, 3],
//       });
    
//       if (result.cancelled) {
//         return;
//       }
    
//       // ImagePicker saves the taken photo to disk and returns a local URI to it
//       let localUri = result.uri;
//       let filename = localUri.split('/').pop();
    
//       // Infer the type of the image
//       let match = /\.(\w+)$/.exec(filename);
//       let type = match ? `image/${match[1]}` : `image`;
    
//       // Upload the image using the fetch and FormData APIs
//       let formData = new FormData();
//       // Assume "photo" is the name of the form field the server expects
//       formData.append('photo', { uri: localUri, name: filename, type });
    
//       return await 
//       fetch('http://10.220.13.28/swissbel/booking_hotelroom_konfirmasi.php', {
//         method: 'POST',
//         body: formData,
//         header: {
//           'content-type': 'multipart/form-data',
//         },
//       }) 
//       .then((response) => response.json())
//       .then((responseJson) =>
//         {
//           console.log(responseJson);
//           this.setState  ({
//               loading : false
//              })
//         });
// }
  

// choosePicture = () => {

//     // var ImagePicker = require('react-native-image-picker');
//     var options = {
//         title: 'Pilih Gambar',
//         storageOptions: {
//           skipBackup: true,
//           path: 'images'
//         }
//     };
//     ImagePicker.showImagePicker(options, (response) => {
//         console.log('Response = ', response);
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         }
//         else if (response.error) {
//           console.log('ImagePicker Error: ', response.error);
//         }
//         else if (response.customButton) {
//           console.log('User tapped custom button: ', response.customButton);
//         }
//         else {
//           console.log(response.fileName);
//           this.setState({
//             srcImg: { uri: response.uri },
//             uri: response.uri,
//             fileName: response.fileName
//           })
//         }
//     })
// }



uploadPicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });
      
      console.log(result);
      let localUri = result.uri;
      let filename = localUri.split('/').pop();
      console.log(filename);
  
      if (!result.cancelled) {
        this.setState({
            srcImg: result.uri,
            uri: result.uri,
            fileName: filename
          });
      }
      console.log(this.state.uri);

    console.log('mulai upload');
    this.setState  ({isLoading : true })
    const data = new FormData();
    //data.append('id', 'id apa saja'); // you can append anyone.
    data.append('fileToUpload', {
      uri: this.state.uri,
      type: 'image/jpeg',
      name: this.state.fileName,
      id_hotel_room_booking : this.state.id_hotel_room_booking
    });
    data.append('id_hotel_room_booking',this.state.id_hotel_room_booking);
    const url= "http://192.168.100.7/swissbel/booking_hotelroom_konfirmasi.php"
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    //   body : JSON.stringify({
    //     id_hotel_room : this.state.id_hotel_room
    //  }),data
    })
    .then((response) => response.json())
    .then((responseJson) =>
      {
        console.log(responseJson);
        this.setState  ({
            isLoading : false
           })
      });
  }



    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            )

        }
      return (
              <View style = {{flex: 1, backgroundColor: 'white', flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity 
              onPress = {this._pickImage}
              style = {{width: 100, height: 40,justifyContent: 'center', alignItems: 'center',
               height: 50, backgroundColor: '#DF4A00'}}>
                  <Text>
                      Pilih Foto
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity 
              onPress = {this.uploadPicture}
              style = {{width: 100, justifyContent: 'center', alignItems: 'center',
               height: 50, color: 'red'}}>
                  <Text>
                      Upload Foto
                  </Text>
              </TouchableOpacity>
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
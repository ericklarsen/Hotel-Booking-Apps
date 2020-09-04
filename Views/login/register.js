import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    AppRegistry,
    TouchableOpacity,    
    Alert,
    ListView,
    ActivityIndicator, 
    Image,
    AsyncStorage
} from 'react-native';
import { Colors } from 'react-native-paper';

export default  class register extends Component
{
    constructor(props){
        super(props)
        this.state ={
            username : '',
            password : '',
            fullname : '',
            email : '',
            hp : '',
        } 
     }

     toHome =() =>{
        this.props.navigation.navigate('toHomeStack')
    }

    register = () =>{
        const {username} = this.state;
        const {password} = this.state;
        const {fullname} = this.state;
        const {email} = this.state;
        const {hp} = this.state;
        // 192.168.100.2 10.220.13.28
        fetch('http://192.168.100.28/swissbel/register.php',{
            method: 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username_guest : username,
                password_guest : password,
                nama_guest : fullname,
                email_guest : email,
                hp_guest : hp,
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson == 'failed'){
                Alert.alert('Username Already in Use')
            }else if(responseJson == 'failed1'){
                Alert.alert('Please fill in all the data in the form!')
                
            }else{
                Alert.alert(responseJson);
                this.props.navigation.navigate('login')
            }
        }).catch((error) =>{
            console.error(error);
        })
    }

    render() {
        return (

            <View style = {stylesIndex.container}>
                
                <Image source={require('../assets/bg.jpg')} style={stylesIndex.backgroundImage} />
                <Image
                  style = {{width:50, height:43}}
                  source = {require("../assets/LOGO.png")}
                />
                {/* <Text style = {{
                    fontSize: 20,
                    marginTop: 10,
                    fontWeight: "normal",
                    color: 'white'
                }}>
                    LOGIN
                </Text> */}

                <TextInput
                placeholder = 'Username'
                placeholderTextColor = {Colors.white}
                
                onChangeText = {TextInputValue => this.setState({username: TextInputValue})}
                underlineColorAndroid = 'transparent'
                style = {styles.TextInputStyle2}
                />

                <TextInput
                secureTextEntry={true} 
                placeholder = 'Password'
                placeholderTextColor = {Colors.white}
                onChangeText = {TextInputValue => this.setState({password: TextInputValue})}
                underlineColorAndroid = 'transparent'
                style = {styles.TextInputStyle}
                />

                <TextInput
                placeholder = 'Email'
                placeholderTextColor = {Colors.white}
                
                onChangeText = {TextInputValue => this.setState({email: TextInputValue})}
                underlineColorAndroid = 'transparent'
                style = {styles.TextInputStyle}
                />
                
                <TextInput
                placeholder = 'Fullname'
                placeholderTextColor = {Colors.white}
                
                onChangeText = {TextInputValue => this.setState({fullname: TextInputValue})}
                underlineColorAndroid = 'transparent'
                style = {styles.TextInputStyle}
                />

                <TextInput
                placeholder = 'Contact Person'
                placeholderTextColor = {Colors.white}
                keyboardType='numeric'                
                onChangeText = {TextInputValue => this.setState({hp: TextInputValue})}
                underlineColorAndroid = 'transparent'
                style = {styles.TextInputStyle}
                />
                <TouchableOpacity activeOpacity = {.4} style = {stylesIndex.btn2} onPress= {this.register}>
                  <Image
                  style = {{marginRight: 5, width: 23, height: 23}}
                      source = {require("../assets/kunci.png")}
                    />
                    <Text style = {{fontSize: 14, color: 'red'}}>
                        REGISTER
                    </Text>
                    
                </TouchableOpacity>
                <View style = {{bottom: 0, position: 'absolute', marginBottom: 15}}>
                    <Text style = {{color: 'white', fontSize: 8, }}>
                        All Right Reserved By Swiss-Belinn SKA | SKA Co Ex Pekanbaru 2019
                    </Text>
                </View>
            </View>
            
        )
      }
}


const styles = StyleSheet.create({
    Container: {
        alignItems : 'center',
        flex: 1,
        marginTop: 5,
        backgroundColor: '#fff'
    },
    TextInputStyle :{
        textAlign: 'center',
        marginTop: 2,
        marginBottom: 7,
        width: '70%',
        color : 'white',
        height: 50,
        borderWidth: 0.5,
        borderRadius: 30,
        borderColor: 'white',
    },
    TextInputStyle2 :{
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 7,
        color : 'white',
        width: '70%',
        height: 50,
        borderWidth: 0.5,
        borderRadius: 30,
        borderColor: 'white',
    },
    TextStyle:{
        color: '#fff',
        textAlign: 'center',
    },
    TouchableOpacityStyle:{
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        marginBottom: 7,
        width: '90%',
        height: 40,
        backgroundColor: '#008cd4'
    },
    TouchableOpacityStyle2:{
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        marginBottom: 7,
        width: '90%',
        height: 40,
        backgroundColor: '#FF5722'
    },
    ContainerDataRooms: {
        flex: 1,
        paddingTop: 20,
        marginLeft: 5,
        marginRight: 5,
    },
    rowViewContainer: {
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10
    }
})

const stylesIndex = StyleSheet.create ({
    container : {
        backgroundColor: '#ce250b',
        flex: 1,
        justifyContent : 'center',
        alignItems: 'center',
    },
    text: {
        color : 'white',
        fontSize: 12,
        marginTop: 10
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        width: 200,
        height: 60,
        borderRadius: 100,
        backgroundColor: 'white',
    },
    btn2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: 200,
        height: 60,
        borderRadius: 100,
        backgroundColor: 'white',
    },
    backgroundImage: {
        flex: 1,
        resizeMode : 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }

})
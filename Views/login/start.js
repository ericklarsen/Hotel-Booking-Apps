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
    Image
} from 'react-native';
export default  class start extends Component
{

    toLogin =() =>{
        this.props.navigation.navigate('login')
    }
    
    toRegister = () =>{
        this.props.navigation.navigate('register')
    }

    render() {
        return (

            <View style = {stylesIndex.container}>
                
                <Image source={require('../assets/bg.jpg')} style={stylesIndex.backgroundImage} />
                <Image
                  style = {{width:210, height:181, marginLeft: 14}}
                  source = {require("../assets/LOGO.png")}
                />
                <Text style = {stylesIndex.text}>
                    Booking Your Room Right Now!
                </Text>
                <TouchableOpacity activeOpacity = {.4} style = {stylesIndex.btn} onPress= {this.toLogin}>
                  <Image
                  style = {{marginRight: 5, width: 19, height: 19}}
                      source = {require("../assets/kunci.png")}
                    />
                    <Text style = {{fontSize: 12, color: 'red'}}>
                        LOGIN
                    </Text>
                    
                </TouchableOpacity>

                <TouchableOpacity activeOpacity = {.4} style = {stylesIndex.btn3} onPress= {this.toRegister}>
                  <Image
                  style = {{marginRight: 5, width: 19, height: 19}}
                      source = {require("../assets/kunci.png")}
                    />
                    <Text style = {{fontSize: 12, color: 'red'}}>
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
        width: 170,
        height: 45,
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
    btn3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        width: 170,
        height: 45,
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
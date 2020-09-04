import React, { Component } from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import {Button} from 'native-base'

class Home extends Component {
    
    render() {
      return (
          <View style = {stylesIndex.container}>
              
              <Image source={require('./assets/bg.jpg')} style={stylesIndex.backgroundImage} />
              <Image
                style = {{width:210, height:181, marginLeft: 14}}
                source = {require("./assets/LOGO.png")}
              />
              <Text style = {stylesIndex.text}>
                  Booking Your Room Right Now!
              </Text>
              <View> 
              <Button style = {stylesIndex.btn}>
                <Image
                style = {{marginRight: 5, width: 23, height: 23}}
                    source = {require("./assets/kunci.png")}
                  />
                  <Text style = {{fontSize: 14, color: 'red'}}>
                      BOOK!
                  </Text>
                  
              </Button>
              </View>
              
              <View style = {{bottom: 0, position: 'absolute', marginBottom: 15}}>
                  <Text style = {{color: 'white', fontSize: 8, }}>
                      All Right Reserved By Swiss-Belinn SKA | SKA Co Ex Pekanbaru 2019
                  </Text>
              </View>
          </View>
          
      )
    }
}
export default Home

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
        width: 100,
        height: 60,
        borderRadius: 100,
        backgroundColor: 'white'
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
import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, SafeAreaView, Image, ScrollView, AppRegistry} from 'react-native'
import { createMaterialBottomTabNavigator } from  'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper';

export default class Home extends Component {
  render() {
    return (
        <SafeAreaView style = {{flex: 1}}>
            <View
              style = {{
                justifyContent: 'center',
                marginTop: -30,
              }}
              >
              <Image source={require('./assets/atas.png')}
              style = {{
                width: '100%',
                height: '35%',
                resizeMode : 'cover',
                position: 'absolute',
                shadowColor: 'black',
                shadowOpacity : 0.2
            }}
              />
              <Image
              source = {require('./assets/logos.png')}
              style = {{
                  width: '32%',
                  height: '21%',
                  marginLeft: 20,
                
                  resizeMode : 'cover',
              }}
              />
              </View>
            <AppTabNavigator/>
        </SafeAreaView>
    )
  }
}


class HomeScreen extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          data:[
              {
              title:"Hello World", 
              text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard",
              image: require('./assets/wedding.jpeg')},
              {
              title:"Lorem Ipsum", 
              text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard",
              image: require('./assets/hotelroom.jpg')},
              
              
          ]
        };
      }


    render() {
      return (
          <View style = {styles.container}>
              
              <ScrollView
                scrollEventThrottle = {16}
              >
                  <View style = {{ flex: 1, backgroundColor: 'white'}}>
                  <Text style = {{fontSize: 22, fontWeight: '500', paddingHorizontal: 20, color: '#2d2d2d'}}>
                      What can we help you?  
                  </Text>
                  <Text style = {{fontSize: 12, paddingHorizontal:20, fontWeight: '100', color: 'grey'}}>
                      There are a things that can we help you
                  </Text>
                  <View style = {{height: 180, marginTop: 20}}>
                      <ScrollView
                      horizontal = {true}
                      showsHorizontalScrollIndicator= {false}
                      >
                          <View style= {{height: 170, width: 180, marginLeft: 20, borderWidth:0.5, borderRadius: 10, borderColor:'#dddddd'}}>
                            <View style= {{flex: 2}}>
                                <Image source={require('./assets/meetingroom.jpg')} style ={{flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                            </View>
                            <View style= {{flex: 1, paddingLeft:10, paddingTop: 10}}>
                                <Text style = {{fontSize : 16, fontWeight: '700', color: '#2d2d2d'}}>Meeting Room</Text>
                                <Text style = {{fontSize: 10, color: '#2d2d2d'}}>We provide a cozy private room for your discussion</Text>
                            </View>
                          </View>

                          <View style= {{height: 170, width: 180, marginLeft: 20, borderWidth:0.5, borderRadius: 10, borderColor:'#dddddd'}}>
                            <View style= {{flex: 2}}>
                                <Image source={require('./assets/hotelroom.jpg')} style ={{flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                            </View>
                            <View style= {{flex: 1, paddingLeft:10, paddingTop: 10}}>
                                <Text style = {{fontSize : 16, fontWeight: '700', color: '#2d2d2d'}}>Hotel Room</Text>
                                <Text style = {{fontSize: 10, color: '#2d2d2d', paddingRight: 5}}>We provide a cozy private room for you and your family</Text>
                            </View>
                          </View>
                          
                          <View style= {{height: 170, width: 180, marginLeft: 20, borderWidth:0.5, borderRadius: 10, borderColor:'#dddddd'}}>
                            <View style= {{flex: 2}}>
                                <Image source={require('./assets/wedding.jpeg')} style ={{flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                            </View>
                            <View style= {{flex: 1, paddingLeft:10, paddingTop: 10}}>
                                <Text style = {{fontSize : 16, fontWeight: '700', color: '#2d2d2d'}}>Wedding Event</Text>
                                <Text style = {{fontSize: 10, color: '#2d2d2d', paddingRight: 5}}>We provide a Grand Ballroom for your unforgettable moment</Text>
                            </View>
                          </View>

                          <View style= {{height: 170, width: 180, marginLeft: 20, borderWidth:0.5, borderRadius: 10, borderColor:'#dddddd'}}>
                            <View style= {{flex: 2}}>
                                <Image source={require('./assets/public.jpg')} style ={{flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                            </View>
                            <View style= {{flex: 1, paddingLeft:10, paddingTop: 10}}>
                                <Text style = {{fontSize : 16, fontWeight: '700', color: '#2d2d2d'}}>Public/Private Event</Text>
                                <Text style = {{fontSize: 10, color: '#2d2d2d', paddingRight: 5}}>We provide a Grand Ballroom for your unforgettable moment</Text>
                            </View>
                          </View>
                      </ScrollView>

                  </View>

                    <View style= {{paddingHorizontal: 20, backgroundColor: '#f2f2f2',height: 150,alignItems: 'center', flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
                        <View style = {{height: 100, width: 80, borderWidth: 0.5,
                            borderRadius: 20, borderColor: '#dddddd',backgroundColor: '#00529e', justifyContent: 'center',
                            alignItems: 'center', marginRight : 10}}>
                                <Icon
                                name="ios-key"
                                color="#ffffff"
                                size={52}
                                />
                                <Text style= {{fontSize: 10, marginTop: 10, color: 'white'}}>Hotel Room</Text>
                        </View>
                        
                        <View style = {{height: 100, width: 80, borderWidth: 0.5,
                            borderRadius: 20, borderColor: '#dddddd',backgroundColor: '#009e4a', justifyContent: 'center',
                            alignItems: 'center', marginRight : 10}}>
                                <Icon
                                name="ios-laptop"
                                color="#ffffff"
                                size={52}
                                />
                                <Text style= {{fontSize: 10, marginTop: 10, color: 'white'}}>Meeting Room</Text>
                        </View>

                        <View style = {{height: 100, width: 80, borderWidth: 0.5,
                            borderRadius: 20, borderColor: '#dddddd',backgroundColor: '#e47215', justifyContent: 'center',
                            alignItems: 'center', marginRight : 10}}>
                                <Icon
                                name="ios-ribbon"
                                color="#ffffff"
                                size={52}
                                />
                                <Text style= {{fontSize: 10, marginTop: 10, color: 'white'}}>Public/Private</Text>
                                <Text style= {{fontSize: 10, marginTop: 1, color: 'white'}}>Event</Text>
                        </View>

                        <View style = {{height: 100, width: 80, borderWidth: 0.5,
                            borderRadius: 20, borderColor: '#dddddd',backgroundColor: '#b50b17', justifyContent: 'center',
                            alignItems: 'center'}}>
                                <Icon
                                name="md-heart-half"
                                color="#ffffff"
                                size={52}
                                />
                                <Text style= {{fontSize: 10, marginTop: 10, color: 'white'}}>Wedding Event</Text>
                        </View>
                        
                    </View>
                    

                    <View style = {{marginLeft: 20, marginTop: 20}}>
                        <Text style = {{fontSize: 20, fontWeight: '700'}}>
                            Promo Of The Month
                        </Text>
                        <Text style = {{fontSize: 11, color: 'grey'}}>
                            All promo in this month just for you!
                        </Text>
                        <View style={{height: 250, justifyContent: 'center', marginTop: 10,}}>
                        <Swiper autoplay={true} showsPagination={false} containerStyle={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} >
        <Image style={{height: 200, width: 355,}} source={require('./assets/15.jpg')} />
        <Image style={{height: 200, width: 355,}} source={require('./assets/12.jpg')} />
        <Image style={{height: 200, width: 355,}} source={require('./assets/Bca-Food.jpg')} />
      </Swiper>
      </View> 
                    </View>
                    
                  </View>
                  
                  </ScrollView>
                  
                  
          </View>
      )
    }
}

class SettingScreen extends Component {
    render() {
      return (
          <View style = {styles.container}>
              
                  <Text style = {{fontSize: 24, fontWeight: '700', marginLeft: 20, color: '#2d2d2d'}}>
                      My Booking
                  </Text>
                  <Text style = {{fontSize: 11, marginLeft: 20, color: 'grey'}}>
                      All your booking room are in here
                  </Text>

                  <ScrollView
                scrollEventThrottle = {16}
              >
                    <View style = {{ marginTop: 20}}>
                    <ScrollView>
                      <View style = {{
                          borderWidth : 0.5,
                          width: 350,
                          height: 85,
                          marginLeft: 20,
                          borderColor: '#dddddd',
                          borderRadius: 5,
                          backgroundColor: '#f6f6f6',
                          marginTop: 10
                      }}>
                          <Text style= {{fontSize: 14, fontWeight: '700', marginLeft: 15, marginTop: 10, color: '#2d2d2d'}}>
                              Siak Meeting Room
                          </Text>
                          <Text style = {{fontSize: 11,color: 'grey', marginLeft: 15, marginTop: 8}}>
                              Booking Date : 11 July 2019
                          </Text>
                          <Text style = {{fontSize: 11,color: 'grey', marginLeft: 15, marginTop: 8}}>
                              Start from : 08.00 AM
                          </Text>
                          
                      </View>

                      <View style = {{
                          borderWidth : 0.5,
                          width: 350,
                          height: 85,
                          marginLeft: 20,
                          borderColor: '#dddddd',
                          borderRadius: 5,
                          backgroundColor: '#f6f6f6',
                          marginTop: 10
                      }}>
                          <Text style= {{fontSize: 14, fontWeight: '700', marginLeft: 15, marginTop: 10, color: '#2d2d2d'}}>
                              Siak Meeting Room
                          </Text>
                          <Text style = {{fontSize: 11,color: 'grey', marginLeft: 15, marginTop: 8}}>
                              Booking Date : 11 July 2019
                          </Text>
                          <Text style = {{fontSize: 11,color: 'grey', marginLeft: 15, marginTop: 8}}>
                              Start from : 08.00 AM
                          </Text>
                          
                      </View>
                      <View style = {{
                          borderWidth : 0.5,
                          width: 350,
                          height: 85,
                          marginLeft: 20,
                          borderColor: '#dddddd',
                          borderRadius: 5,
                          backgroundColor: '#f6f6f6',
                          marginTop: 10
                      }}>
                          <Text style= {{fontSize: 14, fontWeight: '700', marginLeft: 15, marginTop: 10, color: '#2d2d2d'}}>
                              Siak Meeting Room
                          </Text>
                          <Text style = {{fontSize: 11,color: 'grey', marginLeft: 15, marginTop: 8}}>
                              Booking Date : 11 July 2019
                          </Text>
                          <Text style = {{fontSize: 11,color: 'grey', marginLeft: 15, marginTop: 8}}>
                              Start from : 08.00 AM
                          </Text>
                          
                      </View>
                      
                      <View style = {{
                          borderWidth : 0.5,
                          width: 350,
                          height: 85,
                          marginLeft: 20,
                          borderColor: '#dddddd',
                          borderRadius: 5,
                          backgroundColor: '#f6f6f6',
                          marginTop: 10
                      }}>
                          <Text style= {{fontSize: 14, fontWeight: '700', marginLeft: 15, marginTop: 10, color: '#2d2d2d'}}>
                              Siak Meeting Room
                          </Text>
                          <Text style = {{fontSize: 11,color: 'grey', marginLeft: 15, marginTop: 8}}>
                              Booking Date : 11 July 2019
                          </Text>
                          <Text style = {{fontSize: 11,color: 'grey', marginLeft: 15, marginTop: 8}}>
                              Start from : 08.00 AM
                          </Text>
                          
                      </View>

                      <View style = {{
                          borderWidth : 0.5,
                          width: 350,
                          height: 85,
                          marginLeft: 20,
                          borderColor: '#dddddd',
                          borderRadius: 5,
                          backgroundColor: '#f6f6f6',
                          marginTop: 10
                      }}>
                          <Text style= {{fontSize: 14, fontWeight: '700', marginLeft: 15, marginTop: 10, color: '#2d2d2d'}}>
                              Siak Meeting Room
                          </Text>
                          <Text style = {{fontSize: 11,color: 'grey', marginLeft: 15, marginTop: 8}}>
                              Booking Date : 11 July 2019
                          </Text>
                          <Text style = {{fontSize: 11,color: 'grey', marginLeft: 15, marginTop: 8}}>
                              Start from : 08.00 AM
                          </Text>
                          
                      </View>

                      <View style = {{
                          borderWidth : 0.5,
                          width: 350,
                          height: 85,
                          marginLeft: 20,
                          borderColor: '#dddddd',
                          borderRadius: 5,
                          backgroundColor: '#f6f6f6',
                          marginTop: 10
                      }}>
                          <Text style= {{fontSize: 14, fontWeight: '700', marginLeft: 15, marginTop: 10, color: '#2d2d2d'}}>
                              Siak Meeting Room
                          </Text>
                          <Text style = {{fontSize: 11,color: 'grey', marginLeft: 15, marginTop: 8}}>
                              Booking Date : 11 July 2019
                          </Text>
                          <Text style = {{fontSize: 11,color: 'grey', marginLeft: 15, marginTop: 8}}>
                              Start from : 08.00 AM
                          </Text>
                          
                      </View>

                      <View style = {{
                          borderWidth : 0.5,
                          width: 350,
                          height: 85,
                          marginLeft: 20,
                          borderColor: '#dddddd',
                          borderRadius: 5,
                          backgroundColor: '#f6f6f6',
                          marginTop: 10
                      }}>
                          <Text style= {{fontSize: 14, fontWeight: '700', marginLeft: 15, marginTop: 10, color: '#2d2d2d'}}>
                              Siak Meeting Room
                          </Text>
                          <Text style = {{fontSize: 11,color: 'grey', marginLeft: 15, marginTop: 8}}>
                              Booking Date : 11 July 2019
                          </Text>
                          <Text style = {{fontSize: 11,color: 'grey', marginLeft: 15, marginTop: 8}}>
                              Start from : 08.00 AM
                          </Text>
                          
                      </View>
                  </ScrollView>
                    </View>

                  
              </ScrollView>
          </View>
      )
    }
}

class ContactScreen extends Component {
    render(){
        return(
            <View style= {styles.container}>
                <Text style = {{fontSize: 24, fontWeight: '700', marginLeft: 20}}>
                    Contact Us
                </Text>
                <Text style = {{fontSize: 11, color: 'grey', marginLeft: 20}}>
                    Our Contact Number and Location
                </Text>
                <View>
                <Image source={require('./assets/coex.jpg')} style= {{justifyContent: 'center',marginTop: 10, marginLeft: 20, marginRight: 20, width: 355, height: 300}} />
                </View>
                <Text style = {{fontSize: 11, color: 'grey', fontWeight: '700', marginLeft: 20, marginTop: 10}}>
                Complex SKA, Jalan Soekarno-Hata Lot 69
                Pekanbaru, Riau 28294, Indonesia
                </Text>
                <Text style = {{fontSize: 11, color: 'grey', marginLeft: 20, marginTop: 10}}>
                Ph : +62-761-61888	Fax : +62-761-63788
                </Text>
                <Text style = {{fontSize: 11, color: 'grey', marginLeft: 20, marginTop: 10}}>
                Email : pekanbaru@swiss-belhotel.com
                </Text>
                <Text style = {{fontSize: 11, color: 'grey', marginLeft: 20, marginTop: 10}}>
                www.swiss-belhotel.com
                </Text>
                </View>
        )
    }
}

const AppTabNavigator =  createMaterialBottomTabNavigator  ({
    Home: { screen: HomeScreen,
        navigationOptions:{
            tabBarLabel : 'Home',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-home" color = {tintColor} size={20}/>
            )
        }
    },
    Booking: { screen : SettingScreen,
        navigationOptions:{
            tabBarLabel : 'My Booking',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-book" color = {tintColor} size={20}/>
            )
        }
    },
    Contact: { screen : ContactScreen,
        navigationOptions:{
            tabBarLabel : 'Contact Us',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-call" color = {tintColor} size={20}/>
            )
        }
    }
},
{
    initialRouteName: 'Contact',
    tabBarOptions : {
        activeTintColor : 'red',
        inactiveTintColor: 'grey',
        style: {
            backgroundcolor: 'white'
        }
        
    },
    activeTintColor : 'orange',
})

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

AppRegistry.registerComponent('myproject', () => Swiper);
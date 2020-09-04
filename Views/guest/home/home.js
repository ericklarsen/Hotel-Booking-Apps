import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,ListView,ActivityIndicator, AsyncStorage,RefreshControl} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper';

const count = 0;

export default  class home extends Component {
    static navigationOptions = {
        headerTintColor : 'white',
        headerStyle:{
            backgroundColor: '#DF4A00',
        },
        headerTitle:(<Image style={{width:'42%', height: '42%', flex: 1}} resizeMode="center" source={require('../assets/cluster2.png')}/>),
        headerLeft: null,
        
}


    constructor(props){
        super(props)
        //set value in state for initial date
        // this.state = {
        //     isLoading: true,
        //     data: ['1','2']
        // }
        this.state = {
            list: [],
            isLoading: true,
        refreshing: true,
        dataSource : '',
        username: ''
          };

          AsyncStorage.getItem('username', (error, result) => {
            if (result) {
                this.setState({
                    username: result
                });
            }
        });
    }
    toBookingHotel= () =>{
        this.props.navigation.navigate('hotel_room')
    }

    _onRefresh = () => {
        this.componentDidMount();
      }

    toData = (gambar) =>{

        // this.setState(state => {
        //     const data = state.data.push(gambar);
      
        //     return {
        //       data,
        //     };
        //   });
        console.log('Add button pressed '+gambar);
        var total = this.state.list.push(4)
            console.log(this.state.list);
    }

    toMeetingRoom = (kategori) =>{
        this.props.navigation.navigate('meeting_room',{
            kategori: kategori
        })
    }

    componentDidMount(){
        // this.setState({
        //     navParams : this.props.navigation.state.params
            
        // })
        console.log(this.state.navParams)
        // 192.168.100.2 10.220.13.28
        return fetch('http://192.168.100.28/swissbel/view_promo.php')
        .then((response) => response.json())
            .then((responseJson) => {
                    // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
                    console.log(responseJson)
                    this.setState({
                        isLoading: false,
                        dataSource : responseJson,
                        refreshing: false,

                    },function(){})
                    console.log(this.state.dataSource)
            }).catch((error)=>{
                console.error(error);
            })
    }

    render() {
        var SampleNameArray = [ "Pankaj", "Rita", "Mohan", "Amit", "Babulal", "Sakshi" ];
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            )

        }
        const { params } = this.props.navigation.state;
        const itemId = params ? params.param : null;
      return (
          <View style = {styles.container}>
              
              <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
                scrollEventThrottle = {16}
              >
                  <View style = {{ flex: 1, backgroundColor: 'white', marginTop: 20}}>
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
                                <Image source={require('../assets/meetingroom.jpg')} style ={{flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                            </View>
                            <View style= {{flex: 1, paddingLeft:10, paddingTop: 10}}>
                                <Text style = {{fontSize : 16, fontWeight: '700', color: '#2d2d2d'}}>Meeting Room</Text>
                                <Text style = {{fontSize: 10, color: '#2d2d2d'}}>We provide a cozy private room for your discussion</Text>
                            </View>
                          </View>

                          <View style= {{height: 170, width: 180, marginLeft: 20, borderWidth:0.5, borderRadius: 10, borderColor:'#dddddd'}}>
                            <View style= {{flex: 2}}>
                                <Image source={require('../assets/hotelroom.jpg')} style ={{flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                            </View>
                            <View style= {{flex: 1, paddingLeft:10, paddingTop: 10}}>
                                <Text style = {{fontSize : 16, fontWeight: '700', color: '#2d2d2d'}}>Hotel Room</Text>
                                <Text style = {{fontSize: 10, color: '#2d2d2d', paddingRight: 5}}>We provide a cozy private room for you and your family</Text>
                            </View>
                          </View>
                          
                          <View style= {{height: 170, width: 180, marginLeft: 20, borderWidth:0.5, borderRadius: 10, borderColor:'#dddddd'}}>
                            <View style= {{flex: 2}}>
                                <Image source={require('../assets/wedding.jpeg')} style ={{flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                            </View>
                            <View style= {{flex: 1, paddingLeft:10, paddingTop: 10}}>
                                <Text style = {{fontSize : 16, fontWeight: '700', color: '#2d2d2d'}}>Wedding Event</Text>
                                <Text style = {{fontSize: 10, color: '#2d2d2d', paddingRight: 5}}>We provide a Grand Ballroom for your unforgettable moment</Text>
                            </View>
                          </View>

                          <View style= {{height: 170, width: 180, marginLeft: 20, borderWidth:0.5, borderRadius: 10, borderColor:'#dddddd'}}>
                            <View style= {{flex: 2}}>
                                <Image source={require('../assets/public.jpg')} style ={{flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                            </View>
                            <View style= {{flex: 1, paddingLeft:10, paddingTop: 10}}>
                                <Text style = {{fontSize : 16, fontWeight: '700', color: '#2d2d2d'}}>Public/Private Event</Text>
                                <Text style = {{fontSize: 10, color: '#2d2d2d', paddingRight: 5}}>We provide a Grand Ballroom for your unforgettable moment</Text>
                            </View>
                          </View>
                      </ScrollView>

                  </View>

                    <View style= {{paddingHorizontal: 20, borderWidth: 0.5, borderColor:'#B6B5B5', backgroundColor: '#white',height: 120,alignItems: 'center', flexDirection: 'row', marginTop: 20, justifyContent: 'space-between'}}>
                        <View style = {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity 
                        style = {{height: 70, width: 70, borderWidth: 0.5,
                            borderRadius: 50, borderColor: '#dddddd',backgroundColor: '#DF4A00', justifyContent: 'center',
                            alignItems: 'center'}} onPress={this.toBookingHotel}>
                                {/* <Icon
                                name="key"
                                type='link'
                                color="#ffffff"
                                size={40}
                                /> */}
                                <Icon name='ios-key' size={35} type='ionicon'color='#ffffff'/> 
                        </TouchableOpacity>
                                <Text style= {{fontSize: 10, marginTop: 5, color: 'grey'}}>Hotel Room</Text>
                            
                            </View>

                            <View style = {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity 
                        onPress = {this.toMeetingRoom.bind(this, 'meeting')}
                        style = {{height: 70, width: 70, borderWidth: 0.5,
                            borderRadius: 50, borderColor: '#dddddd',backgroundColor: '#0076E1', justifyContent: 'center',
                            alignItems: 'center'}}>
                                {/* <Icon
                                name="key"
                                type='link'
                                color="#ffffff"
                                size={40}
                                /> */}
                                <Icon name='ios-people' size={35} type='ionicon'color='#ffffff'/> 
                        </TouchableOpacity>
                                <Text style= {{fontSize: 10, marginTop: 5, color: 'grey'}}>Meeting Room</Text>
                            
                            </View>
                            
                            <View style = {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style = {{height: 70, width: 70, borderWidth: 0.5,
                            borderRadius: 50, borderColor: '#dddddd',backgroundColor: '#E17E00', justifyContent: 'center',
                            alignItems: 'center'}} 
                        onPress = {this.toMeetingRoom.bind(this, 'public/private')}
                        >
                                {/* <Icon
                                name="key"
                                type='link'
                                color="#ffffff"
                                size={40}
                                /> */}
                                <Icon name='ios-barcode' size={35} type='ionicon'color='#ffffff'/> 
                        </TouchableOpacity>
                                <Text style= {{fontSize: 10, marginTop: 5, color: 'grey'}}>Public/Private Event</Text>
                            
                            </View>

                            <View style = {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity 
                        onPress = {this.toMeetingRoom.bind(this, 'wedding')}
                        style = {{height: 70, width: 70, borderWidth: 0.5,
                            borderRadius: 50, borderColor: '#dddddd',backgroundColor: '#9900B1', justifyContent: 'center',
                            alignItems: 'center'}}>
                                {/* <Icon
                                name="key"
                                type='link'
                                color="#ffffff"
                                size={40}
                                /> */}
                                <Icon name='ios-heart' size={35} type='ionicon'color='#ffffff'/> 
                        </TouchableOpacity>
                                <Text style= {{fontSize: 10, marginTop: 5, color: 'grey'}}>Weeding Event</Text>
                            
                            </View>

                            
                        {/* <View style = {{height: 100, width: 80, borderWidth: 0.5,
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
                        </View> */}
                        
                    </View>
                    


                    <View style = {{marginLeft: 20, marginTop: 20}}>
                        <Text style = {{fontSize: 20, fontWeight: '700'}}>
                            Promo Of The Month
                        </Text>
                        <Text style = {{fontSize: 11, color: 'grey'}}>
                            All promo in this month just for you!
                        </Text>
                        <View style={{height: 250, justifyContent: 'center', marginTop: 10,}}>

                        {/* {this.state.dataSource.map((Object) => (
                    <Text key={Object.gambar_potm} >{Object.gambar_potm}</Text>
                  ))} */}
                        {/* {this.state.dataSource.map((Object) => (
                    <Text key={Object.gambar_potm} >{Object.gambar_potm}</Text>
                  ))} */}
                <Swiper autoplay={true} showsPagination={false} containerStyle={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} >
               
                {this.state.dataSource.map((Object) => (
                <Image key={Object.gambar_potm} style={{height: 200, width: 355,}} source={{uri: 'http://192.168.100.28/swissbel_admin/assets_upload/promo/'+Object.gambar_potm}} />

                  ))}
                
                </Swiper>

                       
      </View> 
                    </View>
                    
                  </View>
                  
                  </ScrollView>
                  
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
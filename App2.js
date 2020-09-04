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
import { createStackNavigator } from 'react-navigation'
import home from './Home'
class start extends Component
{
    static navigationOptions = {
        header: null,
    }

    toLogin =() =>{
        this.props.navigation.navigate('Login')
    }

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
                <TouchableOpacity activeOpacity = {.4} style = {stylesIndex.btn} onPress= {this.toLogin}>
                  <Image
                  style = {{marginRight: 5, width: 23, height: 23}}
                      source = {require("./assets/kunci.png")}
                    />
                    <Text style = {{fontSize: 14, color: 'red'}}>
                        LOGIN
                    </Text>
                    
                </TouchableOpacity>
                <TouchableOpacity activeOpacity = {.4}>
                <Text style = {{
                    fontSize: 10,
                     marginTop: 15,
                     color: 'white',
                }}>
                    You didn't have account? Click it for register.
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

class login extends Component
{
    static navigationOptions = {
        header: null,
    }

    constructor(props){
        super(props)
        this.state ={
            username : '',
            password : '',
        } 
     }

     toHome =() =>{
        this.props.navigation.push('Home')
    }

    render() {
        return (

            <View style = {stylesIndex.container}>
                
                <Image source={require('./assets/bg.jpg')} style={stylesIndex.backgroundImage} />
                <Image
                  style = {{width:50, height:43}}
                  source = {require("./assets/LOGO.png")}
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
                onChangeText = {TextInputValue => this.setState({username: TextInputValue})}
                underlineColorAndroid = 'transparent'
                style = {styles.TextInputStyle2}
                />

                <TextInput
                placeholder = 'Password'
                onChangeText = {TextInputValue => this.setState({username: TextInputValue})}
                underlineColorAndroid = 'transparent'
                style = {styles.TextInputStyle}
                />
                <TouchableOpacity activeOpacity = {.4} style = {stylesIndex.btn2} onPress= {this.toHome}>
                  <Image
                  style = {{marginRight: 5, width: 23, height: 23}}
                      source = {require("./assets/kunci.png")}
                    />
                    <Text style = {{fontSize: 14, color: 'red'}}>
                        LOGIN
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


class inputRooms extends Component{
    static navigationOptions = {
        title: 'Input Room'
    }

    constructor(props){
        super(props)
        this.state ={
            TextInputKategori : '',
            TextInputNama : '',
            TextInputDeskripsi : ''
        } 
     }

    InsertRooms = () =>{
        const {TextInputKategori} = this.state;
        const {TextInputNama} = this.state;
        const {TextInputDeskripsi} = this.state;

        fetch('http://192.168.100.2/swissbel/insert.php',{
            method: 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                kategori_room : TextInputKategori,
                nama_room : TextInputNama,
                deskripsi_room : TextInputDeskripsi
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            Alert.alert(responseJson);
            this.props.navigation.navigate('Second')
        }).catch((error) =>{
            console.error(error);
        })
    }

    ViewRooms =() =>{
        this.props.navigation.navigate('Second')
    }

    state = {  }
    render() {
        return (
            <View style = {styles.Container}>
                <TextInput
                placeholder = 'Enter Kategori'
                onChangeText = {TextInputValue => this.setState({TextInputKategori: TextInputValue})}
                underlineColorAndroid = 'transparent'
                style = {styles.TextInputStyle2}
                />

                <TextInput
                placeholder = 'Enter Name'
                onChangeText = {TextInputValue => this.setState({TextInputNama: TextInputValue})}
                underlineColorAndroid = 'transparent'
                style = {styles.TextInputStyle}
                />

                <TextInput
                placeholder = 'Enter Deskripsi'
                onChangeText = {TextInputValue => this.setState({TextInputDeskripsi: TextInputValue})}
                underlineColorAndroid = 'transparent'
                style = {styles.TextInputStyle}
                />

                <TouchableOpacity activeOpacity = {.4} style = {styles.TouchableOpacityStyle}
                onPress={this.InsertRooms}>
                    <Text style = {styles.TextStyle}>
                        SAVE
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity = {.4} style = {styles.TouchableOpacityStyle}
                onPress={this.ViewRooms}>
                    <Text style = {styles.TextStyle}>
                        VIEW ROOMS
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class viewRooms extends Component{
    static navigationOptions = {
        title: 'Data Rooms'
    }

    constructor(props){
        super(props)
        this.state = {
            isLoading : true
        }
    }

    componentDidMount(){
        return fetch('http://192.168.100.2/swissbel/view_rooms.php')
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson)
                },function(){})
            }).catch((error)=>{
                console.error(error);
            })
 
    }

    Action_Click(id_room,kategori_room,nama_room,deskripsi_room){
        this.props.navigation.navigate('Three',{
            id_room: id_room,
            kategori_room: kategori_room,
            nama_room : nama_room,
            deskripsi_room : deskripsi_room
        })
    }

    ListViewItemSeparator = () =>{
        return(
            <View
                style = {{
                    height: 5,
                    width: '100%',
                    backgroundColor: '#2196F3'
                }}
            />
        )
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
          <View style={styles.ContainerDataRooms}>
              <ListView
                dataSource = {this.state.dataSource}
                renderSeparator = {this.ListViewItemSeparator}
                renderRow = {(rowData) =>
                <Text style= {styles.rowViewContainer} onPress={this.Action_Click.bind(this,
                    rowData.id_room,
                    rowData.kategori_room,
                    rowData.nama_room,
                    rowData.deskripsi_room
                )} >
                   {rowData.nama_room} 
                </Text>
                }
              />
          </View>
      )
    }
}

class updateRooms extends Component{
    static navigationOptions = {
        title: 'Update Rooms'
    }
    constructor(props){
        super(props)
        this.state = {
            TextInputId : '',
            TextInputKategori : '',
            TextInputNama : '',
            TextInputDeskripsi : '',
        }
    }

    componentDidMount(){
        this.setState({
            TextInputId: this.props.navigation.state.params.id_room,
            TextInputKategori: this.props.navigation.state.params.kategori_room,
            TextInputNama: this.props.navigation.state.params.nama_room,
            TextInputDeskripsi: this.props.navigation.state.params.deskripsi_room,

        })
    }

    UpdateRooms = () =>{
        fetch('http://192.168.100.2/swissbel/update.php',{
            method: 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id_room: this.state.TextInputId,
                kategori_room : this.state.TextInputKategori,
                nama_room : this.state.TextInputNama,
                deskripsi_room : this.state.TextInputDeskripsi
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            Alert.alert(responseJson);
            this.props.navigation.navigate('First')
        }).catch((error) =>{
            console.error(error);
        })
    }

    DeleteRooms = () =>{
        fetch('http://192.168.100.2/swissbel/delete.php',{
            method: 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id_room: this.state.TextInputId
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            Alert.alert(responseJson);
            this.props.navigation.navigate('First')
        }).catch((error) =>{
            console.error(error);
        })
    }

    render() {
      return (
        <View style = {styles.Container}>
        <TextInput
        value = {this.state.TextInputKategori}
        placeholder = 'Enter Kategori'
        onChangeText = {TextInputValue => this.setState({TextInputKategori: TextInputValue})}
        underlineColorAndroid = 'transparent'
        style = {styles.TextInputStyle2}
        />

        <TextInput
        value = {this.state.TextInputNama}
        placeholder = 'Enter Name'
        onChangeText = {TextInputValue => this.setState({TextInputNama: TextInputValue})}
        underlineColorAndroid = 'transparent'
        style = {styles.TextInputStyle}
        />

        <TextInput
        value = {this.state.TextInputDeskripsi}
        placeholder = 'Enter Deskripsi'
        onChangeText = {TextInputValue => this.setState({TextInputDeskripsi: TextInputValue})}
        underlineColorAndroid = 'transparent'
        style = {styles.TextInputStyle}
        />

        <TouchableOpacity activeOpacity = {.4} style = {styles.TouchableOpacityStyle}
        onPress={this.UpdateRooms}>
            <Text style = {styles.TextStyle}>
                UPDATE
            </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity = {.4} style = {styles.TouchableOpacityStyle2}
        onPress={this.DeleteRooms}>
            <Text style = {styles.TextStyle}>
                DELETE
            </Text>
        </TouchableOpacity>
    </View>
      )
    }
}

export default App = createStackNavigator({
    Start: { screen : start},
    First: { screen: inputRooms},
    Second : { screen: viewRooms},
    Three : {screen: updateRooms},
    Login : { screen: login },
});

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
        height: 50,
        borderWidth: 0.5,
        borderRadius: 30,
        borderColor: 'white',
    },
    TextInputStyle2 :{
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 7,
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

AppRegistry.registerComponent('navigation', () => App);
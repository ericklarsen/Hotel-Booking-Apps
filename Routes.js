import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Index from './App.js'
import Home from './Home.js'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "index" component = {Index} title = "Index" initial = {true} />
         <Scene key = "home" component = {Home} title = "Home" />
      </Scene>
   </Router>
)
export default Routes
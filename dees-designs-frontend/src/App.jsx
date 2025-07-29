import React,{} from 'react';
import './App.css';
import CustSignUp from './Components/LoginSignUp/CustSignUp';
import DesSignUp from './Components/LoginSignUp/DesSignUp';
import SplashScreen from './Components/SplashScreen';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Login from './Components/LoginSignUp/Login';



function App() {
  return (
    <Router>

      <div className='App'>
      <Routes>
        <Route exact path="/" element={<SplashScreen/>}/>
        <Route exact path="/custSignup" element={<CustSignUp/>}/>
        <Route exact path="/Login" element={<Login/>}/>
      </Routes>
      </div>
     
    </Router>
  )
}

export default App

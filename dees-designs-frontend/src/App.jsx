import React,{} from 'react';
import './App.css';
import CustSignUp from './Components/LoginSignUp/CustSignUp';
import DesSignUp from './Components/LoginSignUp/DesSignUp';
import SplashScreen from './Components/SplashScreen';


function App() {
  return (
    <div className="App">
      {/* <SplashScreen/> */}
      <CustSignUp/>
      {/* <DesSignUp/> */}

    </div>
  )
}

export default App

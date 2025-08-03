import React,{createContext, useState, useEffect} from 'react';
import './App.css';
import CustSignUp from './Components/LoginSignUp/CustSignUp';
import DesSignUp from './Components/LoginSignUp/DesSignUp';
import SplashScreen from './Components/SplashScreen';
import {Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Login from './Components/LoginSignUp/Login';
import HomePage from './Components/Home/Home';
import DesHome from './Components/DesHome/DesHome';
import AddToCart from './Components/CartOrders/AddToCart';
import Error404 from './Components/Error404Page';

const Authentication = createContext();

function App() {

  const [isAuthenticated,setIsAuthenticated] = useState(localStorage.getItem("userId")?true:false);
  const [role,setRole] = useState(localStorage.getItem("role"));

  const ProtectedRoute = ({element,routeRole}) => {
    console.log(role)
    if (isAuthenticated && routeRole === role){
      return element
    } else {
      alert("Please Login to continue")
      return <Navigate to="/Login"/>
      
    }
  
  }
  return (
    <Router>

      <div className='App'>

       

        <Authentication.Provider value={{isAuthenticated,setIsAuthenticated,role,setRole}}>
          <Routes>
          <Route exact path="/" element={<SplashScreen/>}/>
          <Route exact path="/CustomerSignUp" element={<CustSignUp/>}/>
          <Route exact path="/DesignerSignUp" element={<DesSignUp/>}/>
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="*" element={<Error404/>}></Route>


          <Route exact path="/Home" element={<ProtectedRoute routeRole="customer" element={<HomePage/>}/>}/>
          <Route exact path="/AddToCart" element={<ProtectedRoute routeRole="customer" element={<AddToCart/>}/>}/>

          <Route exact path="/DesignersHome" element={<ProtectedRoute routeRole="designer" element={<DesHome/>}/>}/>
          </Routes>
         

        </Authentication.Provider>
     
      </div>
     
    </Router>
  )
}
export {Authentication}
export default App

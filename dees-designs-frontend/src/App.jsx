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
import Checkout from './Components/CartOrders/Checkout';
import AppContext from './Context/AppContext';
import TrackOrder from './Components/CartOrders/TrackOrder';
import WomenWear from './Components/Categories/WomenWear';
import MenWear from './Components/Categories/MenWear';
import DesignersCollection from './Components/Categories/DesignersColllection';
import AddDesignToCart from './Components/CartOrders/AddDesignToCart';
import Navbar from './Components/Navbar';
import ThemeContext from './Context/ThemeContext';
import ProductsContext from './Context/ProductsContext';
import Cart from './Components/CartOrders/Cart';
import CartContext from './Context/CartContext';

const Authentication = createContext();

function App() {
  const [userDetails,setUserDetails] = useState(JSON.parse(localStorage.getItem("userDetails")) || "");
  const {email,password} = userDetails
  const [isAuthenticated,setIsAuthenticated] = useState(userDetails?true:false);
  const [role,setRole] = useState(localStorage.getItem("role"));
  const [authCred,setAuthCred] = useState(btoa(`${email}:${password}`));

  const ProtectedRoute = ({element,routeRole}) => {
    if (isAuthenticated && routeRole === role){
      return element
    } else {
      alert("Please Login to continue")
      return <Navigate to="/Login"/>
      
    }
  
  }
  return (
    <Authentication.Provider value={{isAuthenticated,setIsAuthenticated,role,setRole,authCred,setAuthCred,userDetails,setUserDetails}}>
    <AppContext>
      <ProductsContext>
        <CartContext>
      <ThemeContext>
       <Router>

      <div className='App'>
       

        
          <Routes>
          <Route exact path="/" element={<SplashScreen/>}/>
          <Route exact path="/CustomerSignUp" element={<CustSignUp/>}/>
          <Route exact path="/DesignerSignUp" element={<DesSignUp/>}/>
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="*" element={<Error404/>}></Route>


          <Route exact path="/Home" element={<ProtectedRoute routeRole="customer" element={<HomePage/>}/>}/>
          <Route exact path="/AddToCart/:productId" element={<ProtectedRoute routeRole="customer" element={<AddToCart/>}/>}/>
          <Route exact path="/CheckOut" element={<ProtectedRoute routeRole="customer" element={<Checkout/>}/>}/>
          <Route exact path="/Orders" element={<ProtectedRoute routeRole="customer" element={<TrackOrder/>}/>}/>
          <Route exact path="/WomenWear" element={<ProtectedRoute routeRole="customer" element={<WomenWear/>}/>}/>
          <Route exact path="/MenWear" element={<ProtectedRoute routeRole="customer" element={<MenWear/>}/>}/>
          <Route exact path="/DesignersCollection" element={<ProtectedRoute routeRole="customer" element={<DesignersCollection/>}/>}/>
          <Route exact path="/AddDesignToCart/:productId" element={<ProtectedRoute routeRole="customer" element={<AddDesignToCart/>}/>}/>
        

          <Route exact path="/DesignersHome" element={<ProtectedRoute routeRole="designer" element={<DesHome/>}/>}/>
          </Routes>
         

        
     
      </div>
     
    </Router>
    </ThemeContext>
    </CartContext>
    </ProductsContext>
    </AppContext>
    </Authentication.Provider>
   
  )
}
export {Authentication}
export default App

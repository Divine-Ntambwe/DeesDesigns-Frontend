import React, { useContext, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Authentication } from '../App'
import { motion } from "framer-motion";

function SplashScreen() {
  const {isAuthenticated,role} = useContext(Authentication);
  const nav = useNavigate();

  useEffect(()=>{

    if (isAuthenticated === true){
      role === "customer"?nav("/Home"):nav('/DesignersHome')
    }
  },[])

  
  return (
<>
  { !isAuthenticated && <div className='splash-screen'>
      <div style={{
      backgroundColor: "#f1f1f1f1",
      color: "white",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }}>
      {/* Logo / Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "3.5rem",
          letterSpacing: "2px",
          color: "#e54848",
          marginBottom: "20px",
        }}
      >
        Dee's Designs
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "1.5rem",
          color: "#d07a7a",
          marginBottom: "40px",
          fontWeight:"500"
        }}
      >
       Get DEE Best For You!!
      </motion.p>

      {/* Button */}
      <motion.a
        href="/customerSignUp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 120 }}
        style={{
          fontFamily: "'Raleway', sans-serif",
          padding: "12px 30px",
          backgroundColor: "#e54848",
          color: "white",
          borderRadius: "30px",
          textDecoration: "none",
          fontWeight: "600",
          letterSpacing: "1px",
          boxShadow: "0 0 20px rgba(229,72,72,0.6)"
        }}
      >
        Sign Up
      </motion.a>

      {/* Background circles */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          backgroundColor: "rgba(208,122,122,0.1)",
          top: "20%",
          left: "15%",
          zIndex: -1
        }}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          backgroundColor: "rgba(229,72,72,0.1)",
          bottom: "15%",
          right: "10%",
          zIndex: -1
        }}
      />
    </div> 
    </div>}
    </>
  )
}

export default SplashScreen
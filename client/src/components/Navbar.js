import React from 'react'
import { Link } from 'react-router-dom';

import './Navbar.css'

const Navbar = ({account}) => {
  return (
    <>
    <h1 style={{fontFamily: "'Poppins', sans-serif"}}>BlockBid</h1>
    
    <div style={{width:"50%",height:"3%",border:"2px solid rgba(255, 255, 255, 0.3)",borderRadius:"30px",marginTop:"-1rem", marginBottom:"1rem", }} className="Navbar">
      <h4>Connected Account: {account}</h4>
    </div>
    </>
  )
}

export default Navbar

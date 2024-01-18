import React, { useState } from "react";
import "./Navbar.css";
import axios from "axios";

function Navbar({setCalc,calc,onClicks,onClickss}) {

    const handleSettle = async(e)=>{
        try {
            const params = e.target.name;
           const url = `http://localhost:5000/exp/settleUp/${params}`
           
            // Make a POST request without waiting for the response
            await axios.get(url);
          
            setCalc(!calc)
          } catch (error) {
            console.error('Error making request:', error);
          }
    }
  return (
    <nav className="nav">
      <h5  className="nav__brand">
        Expense Split
      </h5>
      <div>
      <button className="button" onClick={onClicks}>Add User</button>
        <button className="button" onClick={onClickss} >User Detail</button>
        <button className="button" name="settle" onClick={handleSettle}>Settle Up</button> 
        <button className="button" name="reset" onClick={handleSettle}>Reset</button>    
      </div>
       
      
    </nav>
  );
}

export default Navbar;
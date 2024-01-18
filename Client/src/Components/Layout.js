import React from "react";

const Layout =(props) =>{
    return(
        <div className='layout'>
        <div className='header d-flex justify-content-between align-items-center'>
          <h1 className='logo'>Expense Tracker</h1>
         
  
        </div>
  
        <div className='content'>{props.children}</div>
      </div>
    )
}

export default Layout;
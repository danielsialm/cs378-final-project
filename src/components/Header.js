import React from 'react'
import "./Header.css"
import { useNavigate } from "react-router";



const Header = ({ back }) => {
  const navigate = useNavigate();
  return (
    <div className='header-wrapper'>
      <img src={require("../assets/chevron-left.png")} onClick={() => navigate(back)}/>
    </div>
  )
}

export default Header
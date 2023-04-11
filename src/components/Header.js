import React from 'react'
import "./Header.css"
import { useNavigate } from "react-router";



const Header = ({ back, Right, rightOnClick}) => {
  const navigate = useNavigate();
  return (
    <div className='header-wrapper'>
      <img src={require("../assets/chevron-left.png")} onClick={() => navigate(back)}/>
      {Right && <Right className = "w-7 h-7 stroke-[2.8] stroke-gray-800" onClick = {rightOnClick}></Right>}
    </div>
  )
}

export default Header
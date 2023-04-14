import React from 'react'
import "./Header.css"
import { useNavigate } from "react-router";



const Header = ({ back, Right, rightOnClick, rightStyle}) => {
  const navigate = useNavigate();
  return (
    <div className='header-wrapper'>
      <img src={require("../assets/chevron-left.png")} onClick={() => navigate(back)}/>
      {Right && <Right className = {rightStyle} onClick = {rightOnClick}></Right>}
    </div>
  )
}

export default Header

import React from "react";
import '../App.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; // version 5.2.0
const Menu = () => {

  const navigate = useNavigate()

  return (
    <div>
      <div class = "menuHeader">
        <Button onClick={() => { navigate(-1); }} >
              	Back
        </Button>
      </div>
      <p class="title-txt">
        Your Menu
      </p>
    </div>
  )
}

export default Menu;
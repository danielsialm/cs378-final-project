import React from "react";
import '../App.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; // version 5.2.0
const Menu = () => {

  return (
    <div>
      <div class = "menuHeader">
        <Button>
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
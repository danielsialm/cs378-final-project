import React from "react";
import '../App.css';
import Home from './Home.js'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Menu = () => {


  const navigate = useNavigate();
  return (
    <div>
      <Row>
        <div class = "menuHeader">
          <img class="menuBack" src={require("../assets/chevron-left.png")} onClick={() => navigate('/home')}/>
          <img class="menuFavorite" src={require("../assets/bookmark.png")} onClick={() => navigate('/home')}/>
        </div>
      </Row>

      <Row>
        <Row>
          <div class="menuTitle">
            <h1>Your Menu</h1>
          </div>
          <div class="menuPrep">
            <p>30 minute prep</p>
          </div>
          <div class="menuCook">
            <p>1 hour cook</p>
          </div>
          <button class="menuGenerate">
            Generate Recipe
          </button>
        </Row>
      </Row>
    </div>
  )
}

export default Menu;
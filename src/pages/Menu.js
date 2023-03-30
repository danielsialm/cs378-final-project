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
          <div className="menuTitle">
            <h1>Your Menu</h1>
          </div>
          <div className="menuPrep">
            <p>30 minute prep</p>
          </div>
          <div className="menuCook">
            <p>1 hour cook</p>
          </div>
          <div className="menuRecipes">
            <MenuCard 
              item_name="Pan-Seared Steak"
              time="40"
              img_src="steak.jpg"
            />

            <MenuCard 
              item_name="Baked Mac and Cheese"
              time="25"
              img_src="m&c.jpg"
            />          

            <MenuCard 
              item_name="Pizza"
              time="30"
              img_src="pizza.jpg"
            />
          
          </div>
          <button className="menuGenerate">
            Generate Recipe
          </button>
        </Row>
      </Row>
    </div>
  )
}

export default Menu;
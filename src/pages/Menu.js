import React from "react";
import '../App.css';
import './MenuBrowse.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MenuList from '../components/MenuList';
import MenuCard from '../components/MenuCard';

const Menu = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState(null);

  const test_data =   [
  {
    "id": 715424,
    "title": "The Best Chili",
    "image": "https://spoonacular.com/recipeImages/715424-312x231.jpg",
    "imageType": "jpg"
  },
  {
    "id": 715560,
    "title": "World's Greatest Lasagna Roll Ups",
    "image": "https://spoonacular.com/recipeImages/715560-312x231.jpg",
    "imageType": "jpg"
  }]

  return (
    <div>
      <div className="your-menu-wrapper">
        <Header  back='/'/>
        <div className="your-menu-title-wrapper">
          <h1>Your Menu</h1>
        </div>
        <MenuList recipes={ test_data }/>
        <button onClick={() => {navigate("/schedule")}} className="menuGenerate">
          Generate Recipe
        </button>
      </div>
    </div>
  )

  // return (
  //   <div>
  //     <Row>
  //       <div class = "menuHeader">
  //         <img class="menuBack" src={require("../assets/chevron-left.png")} onClick={() => navigate('/')}/>
  //         <img class="menuFavorite" src={require("../assets/bookmark.png")} onClick={() => navigate('/')}/>
  //       </div>
  //     </Row>

  //     <Row>
  //       <Col>
  //       <Row>
  //         <div className="menuTitle">
  //           <h1>Your Menu</h1>
  //         </div>
  //         <div className="menuPrep">
  //           <p>30 minute prep</p>
  //         </div>
  //         <div className="menuCook">
  //           <p>1 hour cook</p>
  //         </div>
  //         <div className="menuRecipes">
  //           <MenuCard 
  //             item_name="Pan-Seared Steak"
  //             time="40"
  //             img_src="steak.jpg"
  //           />

  //           <MenuCard 
  //             item_name="Baked Mac and Cheese"
  //             time="25"
  //             img_src="m&c.jpg"
  //           />          

  //           <MenuCard 
  //             item_name="Pizza"
  //             time="30"
  //             img_src="pizza.jpg"
  //           />
          
  //         </div>
  //         <button className="menuGenerate">
  //           Generate Recipe
  //         </button>
  //       </Row>
  //       </Col>
  //     </Row>
  //   </div>
  // )
}

export default Menu;
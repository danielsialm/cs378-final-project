import React from "react";
import Header from "../components/Header";
import "./RecipeBrowse.css"
import RecipeCard from "../components/RecipeCard";

const RecipeBrowse = ({page_name}) => {
  return (
    <div className="recipe-browse-wrapper">
      <Header />
      <div className="recipe-browse-title-wrapper">
        <h1>{page_name}</h1>
        <div className="recipe-browse-filter">
          <img src={require("../assets/filter.png")}/>
        </div>
      </div>
      <div>
        <RecipeCard 
          item_name="Pizza"
          time="30"
          img_src="pizza.jpg"
        />

        <RecipeCard 
          item_name="Pan-Seared Steak"
          time="40"
          img_src="steak.jpg"
        />
      </div>
    </div>
  )
}

export default RecipeBrowse;
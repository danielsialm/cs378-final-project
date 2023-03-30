import { useState, useEffect } from "react";
import Header from "../components/Header";
import RecipesList from "../components/RecipesList"
import "./RecipeBrowse.css"

import popularRecipes from "../data/popular.json"


const RecipeBrowse = ({pageName}) => {

  const [recipes, setRecipes] = useState(null);
  
  // const src = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=09a121a6694d4d7e8473e2226fefe82f&sort=popularity'
  // useEffect(() => {
  //   fetch(src)
  //     .then(response => response.json())
  //     .then((data) => {
  //       setRecipes(data["results"]);
  //     })
  //     .catch(error => console.log(error));
  // }, []);

  // local
  useEffect(() => {
    setRecipes(popularRecipes["results"]);
  }, []);

  return (
    <div>
      <div className="recipe-browse-wrapper">
        <Header back='/'/>
        <div className="recipe-browse-title-wrapper">
          <h1>{pageName}</h1>
          <div className="recipe-browse-filter">
            <img src={require("../assets/filter.png")}/>
          </div>
        </div>
        <RecipesList recipes={recipes}/>
      </div>
    </div>
  )
}

export default RecipeBrowse;
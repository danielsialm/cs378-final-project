import { useState, useEffect } from "react";
import Header from "../components/Header";
import RecipesList from "../components/RecipesList";
import "./RecipeBrowse.css";
import axios from "axios";
import { firebaseConfig, auth } from "./firebase";


import recentRecipes from "../data/recent"
import popularRecipes from "../data/popular";


const RecipeBrowse = ({ pageName }) => {
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
    console.log(pageName)
    if (pageName === "Trending Recipes")
      setRecipes(popularRecipes.results);
    else if (pageName === "Recent Recipes")
      setRecipes(recentRecipes.results);
    else if (pageName === "Saved Recipes") {
      if(auth && auth.currentUser) {
        axios
        .get(
          `${
            firebaseConfig.databaseURL + "/" + auth.currentUser.uid
          }/recipes.json`,
          {
            method: "GET",
          }
        ).then((res) => {
          if (res.data) {
            setRecipes(Object.values(res.data))
          }
        })
      }else {
        alert("Please login to save recipes.");
      }
    }
      
  }, []);

  return (
    <div>

      <Header back="/home" />
      <div className="recipe-browse-wrapper">
        <div className="recipe-browse-title-wrapper">
          <h1>{pageName}</h1>
          <div className="recipe-browse-filter">
            <img src={require("../assets/filter.png")} />
          </div>
        </div>
        <RecipesList recipes={recipes} />
      </div>
    </div>
  );
};

export default RecipeBrowse;

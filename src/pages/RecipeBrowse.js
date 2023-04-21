import { useState, useEffect } from "react";
import Header from "../components/Header";
import RecipesList from "../components/RecipesList";
import "./RecipeBrowse.css";
import axios from "axios";
import { firebaseConfig, auth } from "./firebase";
import { useParams, useNavigate } from "react-router-dom";

// import recentRecipes from "../data/recent"
import popularRecipes from "../data/popular";
import { ReactComponent as Search } from "../assets/icons/search.svg";
import { Button } from "bootstrap";

const RecipeBrowse = ({ pageName }) => {
  const [recipes, setRecipes] = useState(null);

  // const src = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=09a121a6694d4d7e8473e2226fefe82f&instructionsRequired=True&sort=popularity'
  // useEffect(() => {
  //   fetch(src)
  //     .then(response => response.json())
  //     .then((data) => {
  //       setRecipes(data["results"]);
  //     })
  //     .catch(error => console.log(error));
  // }, []);

  // local

  const searchURL = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=940c7c2ad4974226862d5c390f8a11a1&instructionsRequired=True&sort=popularity'
  const { query } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (pageName === "Trending Recipes")
      setRecipes(popularRecipes.results);
    else if (pageName === "Recent Recipes") {
      let recentRecipesLength = window.localStorage.length;
      let recentRecipes = [];
      for(let i = 0; i < recentRecipesLength; i++) {
        let recipeId = window.localStorage.key(i);
        if(recipeId === 'items') continue;
        let recipeInfo = JSON.parse(window.localStorage.getItem(recipeId));
        let recipe = {};
        recipe.id = recipeId;
        recipe.title = recipeInfo.name;
        recipe.image = recipeInfo.image;
        recentRecipes.push(recipe);
      }
      if(recentRecipes.length > 0) setRecipes(recentRecipes);
    }
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
          }else {
            setRecipes(null);
          }
        })
      }else {
        alert("Please login to save recipes.");
      }
    }
    else if(pageName === "Search"){
      axios.get(`${searchURL}&query=${query}`).then((res) => {
        if(res.data){
          setRecipes(res.data.results);
        }
      }).catch((err) => console.log(err));
    }
    else if(pageName === "My Recipes"){
      //get my recipies from db
      if(auth && auth.currentUser) {
        axios
        .get(
          `${
            firebaseConfig.databaseURL + "/" + auth.currentUser.uid
          }/created.json`,
          {
            method: "GET",
          }
        ).then((res) => {
          if (res.data) {
            setRecipes(Object.values(res.data))
            let temp = Object.values(res.data);
            for(let i = 0; i < temp.length; i++){
              if(!window.localStorage.getItem(temp[i].id)) {
                window.localStorage.setItem(temp[i].id, JSON.stringify(temp[i]));
              }
            }
          }else {
            setRecipes(null);
          }
        })

      
      }else {
        alert("Please login to save recipes.");
      }
    }
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search/${event.target.value}`);
      navigate(0)
    }
  };

  return (
    <div>

      <Header back="/home" />
      <div className="recipe-browse-wrapper">
      {pageName === "Search" ?
          <div>
            <div className="w-full md:p-3 p-3 md:border-4 border-2 border-gray-200 bg-gray-50 rounded-lg flex flex-row items-center mb-2">
              <Search className="w-7 h-7 text-gray-600 mr-4"></Search>
              <input
                type="text"
                className="active:border-none md:text-2xl text-xl outline-none grow min-w-0 bg-gray-50"
                placeholder={query}
                onKeyDown={handleKeyDown}
              >
              </input>
              {/* <Options className="w-10 h-10 text-gray-600 ml-4"></Options> */}
            </div>
            <div className="py-2 font-bold text-gray-500">{`Results for ${query}`}</div>
          </div>
            :
            <div className="recipe-browse-title-wrapper">
              <h1>{pageName}</h1>
              {/* <div className="recipe-browse-filter">
                <img src={require("../assets/filter.png")} />
              </div> */}
            </div>
          }
        {recipes ? <RecipesList recipes={recipes} /> : <div className="text-center pb-10 text-gray-500">No Recipes Here Yet</div>}
        {pageName === "My Recipes" &&
        <div className="w-full p-4 bg-green-300 text-center text-lg rounded-lg shadow" onClick={() => navigate("/create")}>Create Recipe</div>
        }
        </div>
    </div>
  );
};

export default RecipeBrowse;

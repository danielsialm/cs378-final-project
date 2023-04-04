import React from "react";
import '../App.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../components/Header';

import recipeData from '../data/recipe.json';

const Recipe = () => {
  const { id } = useParams();
  const [name, setName] = useState(null);
  const [servings, setServings] = useState(0);
  const [time, setTime] = useState(0);
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState(["Loading..."]);
  const [equipment, setEquipment] = useState(["Loading..."]);
  const [steps, setSteps] = useState(["Loading..."]);



  // src = 'http://api.spoonacular.com/recipes/{id}/information?apiKey=09a121a6694d4d7e8473e2226fefe82f';
  // useEffect(() => {
  //   fetch(src)
  //     .then(response => response.json())
  //     .then((data) => {
  //       setName(data["title"]);
  //     })
  //     .catch(error => console.log(error));
  // }, []);

  // local
  useEffect(() => {
    setName(recipeData["title"]);
    setServings(recipeData["servings"]);
    setTime(recipeData["readyInMinutes"]);
    setImage(recipeData["image"]);


    setIngredients(recipeData["extendedIngredients"].map(item => item.original));
    setSteps(recipeData["analyzedInstructions"][0]["steps"].map(item => item.step));
  }, []);

  return (
    <div>
      <Header back={-1} />
      <p className="title-txt">
        { name }
      </p>
      <img src={image} alt={name} />
      <p>{servings} Servings</p>
      <p>{time} Minutes</p>
      <p>Ingredients</p>
      <ol>
        {ingredients.map(item => <li key={item}>{item}</li>)}
      </ol>
      <p>Equipment</p>
      <ol>
        {equipment.map(item => <li key={item}>{item}</li>)}
      </ol>
      <p>Steps</p>
      <ol>
        {steps.map(item => <li key={item}>{item}</li>)}
      </ol>
    </div>
  )
}

export default Recipe;
import React from "react";
import '../App.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@mui/material";
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

  const handleFinish = () => {
    window.localStorage.setItem("items", JSON.stringify([]));
  }


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
    const equipmentSet = new Set();
    recipeData["analyzedInstructions"][0]["steps"].forEach(element => {
      element.equipment.forEach(item => equipmentSet.add(item.name));
    });
    setEquipment(Array.from(equipmentSet));
  }, []);

  return (

    <div className="space-y-4 mx-8">
    <Header back="/menu" />
    <div>
      <h1 className="text-4xl font-bold mb-8">{name}</h1>
    </div>
    <div  className="flex flex-col w-half items-center">
       <img className="p-4" src={image} alt={name} />

    </div>
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Ingredients:
      </h2>
      <div className="flex flex-col w-full text-base text-gray-700 p-0.5 ps-4" >
          {ingredients.map(item => <li className="text-base text-gray-700" key={item}>{item}</li>)}
      </div>
      <h2 className="text-2xl font-bold text-gray-700 my-4">
        Equipment:
      </h2>
      <div className="flex flex-col w-full text-base text-gray-700 p-0.5 ps-4" >
          {equipment.map(item => <li className="text-base text-gray-700" key={item}>{item}</li>)}
      </div>
    </div>

    <div className="w-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Steps:</h2>
      {steps &&
        steps.map((step, i) => {
          return (
            <div className="flex flex-row w-full">
              <div
                className={`bg-blue-400 w-4 h-auto mr-4 flex flex-row items-center 
            ${i === 0 ? "rounded-t-full" : ""} ${
                  i === steps.length - 1 ? "rounded-b-full" : ""
                }
          `}>
                <div className="w-4 h-4 bg-gray-100 rounded-full"></div>
              </div>
              <div className="text-lg text-gray-700 py-2 ">
                {step}
              </div>
            </div>
          );
        })}
    </div>
    <Button
      onClick={handleFinish}
      className="schedule-finish-button"
      fullWidth
      variant="contained">
      Add to menu
    </Button>
  </div>
  );



































    // <div>
    //   <Header back={-1} />
    //   <p className="title-txt">
    //     { name }
    //   </p>
    //   <img src={image} alt={name} />
    //   <p>{servings} Servings</p>
    //   <p>{time} Minutes</p>
    //   <p>Ingredients</p>
    //   <ol>
    //     {ingredients.map(item => <li key={item}>{item}</li>)}
    //   </ol>
    //   <p>Equipment</p>
    //   <ol>
    //     {equipment.map(item => <li key={item}>{item}</li>)}
    //   </ol>
    //   <p>Steps</p>
    //   <ol>
    //     {steps.map(item => <li key={item}>{item}</li>)}
    //   </ol>
    // </div>
  
}

export default Recipe;
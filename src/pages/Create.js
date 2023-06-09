import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../components/Header";
import { firebaseConfig, auth } from "../pages/firebase";
import axios from "axios";
import { ReactComponent as Bookmark } from "../assets/bookmark.svg";

import recipeData from "../data/recipe.json";

const Create = () => {
  
  const [name, setName] = useState("Your Custom Recipe");
  const [servings, setServings] = useState(0);
  const [time, setTime] = useState(0);
  const [ingredients, setIngredients] = useState(["New Ingredient"]);
  const [equipment, setEquipment] = useState(["New Equipment"]);
  const [steps, setSteps] = useState(["New Step"]);
  const [save, setSaved] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const id = -1 * Math.floor(Math.random() * 1000000);

  const handleFinish = () => {
    let temp = [];
    for(let i = 0; i < steps.length; i++){
      temp.push({step: steps[i]})
    }
    let currentItem = {
      custom: true,
      equipment: equipment,
      image: "https://previews.123rf.com/images/kroljaaa/kroljaaa1407/kroljaaa140700055/30112170-seamless-kitchen-background-of-vegetables-beautiful-background-vector-illustration-endless-texture.jpg",
      ingredients: ingredients,
      name: name,
      stepsLong: temp,
      time: 0,
      title: name,
      id: id,
    }
    if(!window.localStorage.getItem(id)) {
      window.localStorage.setItem(id, JSON.stringify(currentItem));
    }
    //adding it to a menu
    let items = JSON.parse(window.localStorage.getItem("items")) || [];

    let index = items.findIndex((item) => item.id === id);

    console.log(index);
    let newArray = [...items];
    if (index === -1) {
      alert("Added recipe to your menu!");
      newArray = [...items, currentItem];
    } else {
      alert("Recipe is already part of your menu!");
    }

    console.log(newArray);
    window.localStorage.setItem("items", JSON.stringify(newArray));
  };

  const saveRecipe = () => {
    let temp = [];
    for(let i = 0; i < steps.length; i++){
      temp.push({step: steps[i]})
    }
    let currentItem = {
      custom: true,
      equipment: equipment,
      image: "https://previews.123rf.com/images/kroljaaa/kroljaaa1407/kroljaaa140700055/30112170-seamless-kitchen-background-of-vegetables-beautiful-background-vector-illustration-endless-texture.jpg",
      ingredients: ingredients,
      name: name,
      title: name,
      stepsLong: temp,
      time: 0,
      id: id,
    }
    if(!window.localStorage.getItem(id)) {
      window.localStorage.setItem(id, JSON.stringify(currentItem));
    }

    if (!auth || !auth.currentUser) {
      alert("Please login to create recipes!");
      return;
    } else {
      // Recipe not saved yet
      return fetch(`${firebaseConfig.databaseURL + "/" + auth.currentUser.uid}/created.json`, {
        method: "POST",
        body: JSON.stringify(currentItem)
      }).then((res) => {
        if (res.status !== 200) {
          console.log(res.statusText);
          // throw new Error(res.statusText);
        } else {
          alert("Saved Recipe")
          console.log("success");
          return;
        }
    })
  }}

  const handleSave = (e) => {
    if (!auth || !auth.currentUser) {
      e.stopPropagation();
      alert("Please login to save recipes!");
      return;
    } else {
      let index = savedRecipes.findIndex((recipe) => {
        return recipe.id === id;
      });

      console.log(index);
      let temp = [];
      for(let i = 0; i < steps.length; i++){
        temp.push({step: steps[i]})
      }
      let currentItem = {
        custom: true,
        equipment: equipment,
        image: "https://previews.123rf.com/images/kroljaaa/kroljaaa1407/kroljaaa140700055/30112170-seamless-kitchen-background-of-vegetables-beautiful-background-vector-illustration-endless-texture.jpg",
        ingredients: ingredients,
        name: name,
        stepsLong: temp,
        time: 0,
        title: name,
        id: id,
      }

      // Recipe not saved yet
      if (index === -1) {
        console.log({ savedRecipes });
        console.log(currentItem);
        axios
          .post(
            `${
              firebaseConfig.databaseURL + "/" + auth.currentUser.uid
            }/created.json`,
            JSON.stringify(currentItem)
          )
          .then((res) => {
            setSavedRecipes([...savedRecipes, currentItem]);
            setSaved(true);
          });
      } else {
        // Need to get from database because need the db assigned id of the
        // items so we can delete the right one
        axios
          .get(
            `${
              firebaseConfig.databaseURL + "/" + auth.currentUser.uid
            }/recipes.json`,
            {
              method: "GET",
            }
          )
          .then((res) => {
            // Get the id of item in database and use it to delete the item
            let db_item_id = Object.keys(res.data)[index];
            setSaved(false);
            axios
              .delete(
                `${
                  firebaseConfig.databaseURL + "/" + auth.currentUser.uid
                }/recipes/${db_item_id}.json`
              )
              .then((res) => {
                // update our state
                let copy = [...savedRecipes];
                copy.splice(index, 1);
                setSavedRecipes(copy);
              });
          });
      }
    }
    e.stopPropagation();
  };

  const ingredientsKeyDown = (event, i) => {
      let temp = [...ingredients];
      console.log("temp", temp)
      temp[i] = event.target.value;
      if (event.key === 'Enter' && i == temp.length - 1){
        temp.push("");
      }
      if (event.key === 'Backspace' && i !== 0 && temp[i] === "") {
        temp.splice(i, 1);
      }
      setIngredients(temp);
  }

  const equipmentsKeyDown = (event, i) => {
      let temp = [...equipment];
      console.log("temp", temp)
      temp[i] = event.target.value;
      if (event.key === 'Enter' && i == temp.length - 1){
          temp.push("");
      }
      if (event.key === 'Backspace' && i !== 0 && temp[i] === "") {
        temp.splice(i, 1);
      }
      setEquipment(temp);
  }

  const stepsKeyDown = (event, i) => {
      let temp = [...steps];
      temp[i] = event.target.value;
      if (event.key === 'Enter' && i == temp.length - 1){
          temp.push("");
      }
      if (event.key === 'Backspace' && i !== 0 && temp[i] === "") {
        temp.splice(i, 1);
      }
      setSteps(temp);
  }

  const nameKeyDown = (event) => {
      setName(event.target.value);
      console.log(name);
  }

  return (
    <>
      <Header
          back={-1}
          Right={Bookmark}
          rightOnClick={handleSave}
          rightStyle={`w-8 h-8 ${save ? "fill-[#FEE135]" : ""} stroke-[#FEE135]`}
      />
      <div className="space-y-4 mx-8">
        <div>
          <input type={"text"} className="text-3xl font-bold mb-8 w-full" placeholder={name} onInput = {(e)=>nameKeyDown(e)}></input>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Ingredients:
          </h2>
          <div className="flex flex-col w-full text-base text-gray-700 p-0.5 ps-4">
            {ingredients.map((item, i) => (
                <li key = {i}>
                   <input type={"text"} className="text-base text-gray-700" 
                   placeholder = {"New Ingredient"} onKeyDown = {(e)=>ingredientsKeyDown(e, i)}
                   ></input> 
                </li>
            ))}
            
          </div>
          <h2 className="text-2xl font-bold text-gray-700 my-4">Equipment:</h2>
          <div className="flex flex-col w-full text-base text-gray-700 p-0.5 ps-4">
            {equipment.map((item, i) => (
              <li key = {i}>
              <input type={"text"} className="text-base text-gray-700" 
                placeholder = {"New Equipment"} onKeyDown = {(e)=>equipmentsKeyDown(e, i)}
              ></input> 
           </li>
            ))}
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
                   <input type={"textarea"} className="text-lg text-gray-700 py-2" 
                   placeholder = {"New Step"} onKeyDown = {(e)=>stepsKeyDown(e, i)}
                   ></input> 
                 
                </div>
              );
            })}
        </div>
        {/* <Button
          onClick={handleFinish}
          className="schedule-finish-button"
          fullWidth
          variant="contained">
          Add to menu
        </Button> */}
        <Button
          onClick={saveRecipe}
          className="schedule-finish-button"
          fullWidth
          variant="contained">
          Save Recipe
        </Button>

        <Button
          onClick = {handleFinish}
          className="schedule-finish-button"
          fullWidth
          variant="contained">
          Add to Menu
        </Button>
      </div>
    </>
  );
};

export default Create;

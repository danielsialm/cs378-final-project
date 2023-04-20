import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../components/Header";
import { firebaseConfig, auth } from "../pages/firebase";
import axios from "axios";
import { ReactComponent as Bookmark } from "../assets/bookmark.svg";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const Recipe = () => {
  const { id } = useParams();
  const [name, setName] = useState(null);
  const [servings, setServings] = useState(0);
  const [time, setTime] = useState(0);
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState(["Loading..."]);
  const [equipment, setEquipment] = useState(["Loading..."]);
  const [steps, setSteps] = useState(["Loading..."]);
  const [save, setSaved] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);


  let currentItem = {};
  currentItem.title = name;
  currentItem.image = image;
  currentItem.id = id;
  currentItem.notes = notes;

  const handleClickOpen = (e) => {
    if(!save) {
      setOpen(true);
    }else {
      setNotes("");
      handleSave(e);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFinish = () => {
    //adding it to a menu
    let items = JSON.parse(window.localStorage.getItem("items")) || [];

    let index = items.findIndex((item) => item.id === id);

    let newArray = [...items];
    if (index === -1) {
      alert("Added recipe to your menu!");
      newArray = [...items, currentItem];
    } else {
      alert("Recipe is already part of your menu!");
    }

    window.localStorage.setItem("items", JSON.stringify(newArray));
  };

  const handleSave = (e) => {
    handleClose();
    if (!auth || !auth.currentUser) {
      e.stopPropagation();
      alert("Please login to save recipes!");
      return;
    } else {
      let index = savedRecipes.findIndex((recipe) => {
        return parseInt(recipe.id) === parseInt(id);
      });
      // Recipe not saved yet
      if (index === -1) {
        axios
          .post(
            `${
              firebaseConfig.databaseURL + "/" + auth.currentUser.uid
            }/recipes.json`,
            JSON.stringify(currentItem)
          )
          .then((res) => {
            setSavedRecipes([...savedRecipes, currentItem]);
            setSaved(true);
            let recipeInfo = JSON.parse(window.localStorage.getItem(id));
            window.localStorage.removeItem(id);
            recipeInfo["notes"] = notes;
            window.localStorage.setItem(id, JSON.stringify(recipeInfo));
            setNotes("");
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
                setNotes("");
              });
          });
      }
    }

    e.stopPropagation();
  };

    useEffect(() => {
      if(!window.localStorage.getItem(id)) {
        const src = `https://api.spoonacular.com/recipes/${id}/information?apiKey=940c7c2ad4974226862d5c390f8a11a1`;
        fetch(src)
        .then(response => response.json())
        .then((recipeData) => {
          setName(recipeData["title"]);
          setServings(recipeData["servings"]);
          setTime(recipeData["readyInMinutes"]);
          setImage(recipeData["image"]);

          const ingredientList = recipeData["extendedIngredients"].map((item) => item.original);
          setIngredients(ingredientList);
          const stepList = recipeData["analyzedInstructions"][0]["steps"].map((item) => item.step);
          setSteps(stepList);
          const equipmentSet = new Set();
          recipeData["analyzedInstructions"][0]["steps"].forEach((element) => {
            element.equipment.forEach((item) => equipmentSet.add(item.name));
          });
          const equipmentList = Array.from(equipmentSet)
          setEquipment(equipmentList);
          setNotes(notes);
          const recipeInfo = {
            "name" : recipeData["title"],
            "servings" : recipeData["servings"],
            "time" : recipeData["readyInMinutes"],
            "image" : recipeData["image"],
            "ingredients" : ingredientList,
            "equipment" : equipmentList,
            "stepsLong" : recipeData["analyzedInstructions"][0]["steps"],
            "notes" : ""
          }
          window.localStorage.setItem(id, JSON.stringify(recipeInfo));
        })
        .catch(error => console.log(error));
      } else {
        const recipeInfo = JSON.parse(window.localStorage.getItem(id));
        setName(recipeInfo["name"]);
        setServings(recipeInfo["servings"]);
        setTime(recipeInfo["time"]);
        setImage(recipeInfo["image"]);
        setIngredients(recipeInfo["ingredients"]);
        setEquipment(recipeInfo["equipment"]);
        setSteps(recipeInfo["stepsLong"].map((item) => item.step));
        setNotes(recipeInfo["notes"]);
      }

      //saving the recipe
      if (auth && auth.currentUser) {
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
            if (res.data) {
              let recipes = Object.values(res.data);
              // console.log(recipes)

              // this useEffect doesn't run when state is altered. So to avoid
              // having to make an api call each time, we will save the recipes
              // Probably don't need to save recipes. Can just do a get request
              // each time you click on save. In fact, that's probably better tbh
              setSaved(recipes.some((recipe) => parseInt(recipe.id) === parseInt(id)));
              setSavedRecipes(recipes);
            }else {
              setSaved(false);
              setSavedRecipes([]);
            }
          });
      }
    }, []);

  return (
    <>
      <Header
          back={-1}
          Right={Bookmark}
          rightOnClick={handleClickOpen}
          rightStyle={`w-8 h-8 ${save ? "fill-[#FEE135]" : ""} stroke-[#FEE135]`}
      />
      <div className="space-y-4 mx-8">
        <div>
          <h1 className="text-4xl font-bold mb-8">{name}</h1>
        </div>
        <div className="flex flex-col w-half items-center">
          <img className="p-4" src={image} alt={name} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Ingredients:
          </h2>
          <div className="flex flex-col w-full text-base text-gray-700 p-0.5 ps-4">
            {ingredients.map((item) => (
              <li className="text-base text-gray-700" key={item}>
                {item}
              </li>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-gray-700 my-4">Equipment:</h2>
          <div className="flex flex-col w-full text-base text-gray-700 p-0.5 ps-4">
            {equipment.map((item) => (
              <li className="text-base text-gray-700" key={item}>
                {item}
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
                  <div className="text-lg text-gray-700 py-2 ">{step}</div>
                </div>
              );
            })}
        </div>
        {notes && notes.length > 0 ? 
        <div className="w-full flex flex-col">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Notes:</h2>
          <h4 className="text-l mb-4">{notes}</h4>
        </div> : <div></div>}
        <Button
          onClick={handleFinish}
          className="schedule-finish-button"
          fullWidth
          variant="contained">
          Add to menu
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Recipe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="notes"
            label="Notes for recipe"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Recipe;

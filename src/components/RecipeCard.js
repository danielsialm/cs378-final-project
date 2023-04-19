import { useState, useEffect } from "react";
import axios from "axios";
import "./RecipeCard.css";
import plus from "../assets/plus.svg";
import check from "../assets/check.svg";
import { useNavigate } from "react-router";
import { ReactComponent as Bookmark } from "../assets/bookmark.svg";
import { firebaseConfig, auth } from "../pages/firebase";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";


const RecipeCard = ({ title, id, image }) => {
  const navigate = useNavigate();

  let items = JSON.parse(window.localStorage.getItem("items")) || [];

  let currentItem = {};
  currentItem.title = title;
  currentItem.image = image;
  currentItem.id = id;
  const [clicked, setClicked] = useState(items.some((item) => item.id === id));
  const [used, setUsed] = useState(0);
  const [save, setSaved] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (auth && auth.currentUser) {
      console.log("running")
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
          }
        });
    }
  }, []);

  const handleClick = (e) => {
    setClicked(!clicked);
    setUsed(used + 1);
    e.stopPropagation();
  };

  const handleClickOpen = (e) => {
    e.stopPropagation();
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

  const handleSave = (e) => {
    setOpen(false);
    if (!auth || !auth.currentUser) {
      e.stopPropagation();
      alert("Please login to save recipes!");
      return;
    } else {
      let index = savedRecipes.findIndex((recipe) => {
        return parseInt(recipe.id) === parseInt(id);
      });
      // Recipe not saved yet
      console.log(notes);
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
            console.log(recipeInfo);
            console.log(notes);
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
    if (used) {
      let items = JSON.parse(window.localStorage.getItem("items")) || [];

      let index = items.findIndex((item) => parseInt(item.id) === parseInt(id));

      console.log(index);
      let newArray = [...items];
      if (index === -1) {
        newArray = [...items, currentItem];
      } else {
        items.splice(index, 1);
        newArray = [...items];
      }

      console.log(newArray);
      window.localStorage.setItem("items", JSON.stringify(newArray));

      // cache information if it doesn't exist already
      if(!window.localStorage.getItem(currentItem.id)) {
        const src = `https://api.spoonacular.com/recipes/${currentItem.id}/information?apiKey=940c7c2ad4974226862d5c390f8a11a1`;
        fetch(src)
        .then(response => response.json())
        .then((recipeData) => {
          const ingredientList = recipeData["extendedIngredients"].map((item) => item.original);
          const stepList = recipeData["analyzedInstructions"][0]["steps"].map((item) => item.step);
          const equipmentSet = new Set();
          recipeData["analyzedInstructions"][0]["steps"].forEach((element) => {
            element.equipment.forEach((item) => equipmentSet.add(item.name));
          });
          const equipmentList = Array.from(equipmentSet)

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
      }
    }
  }, [used]);

  return (
    <div
      className="recipe-card-wrapper"
      onClick={() => navigate("/recipe/" + id)}>
      <div className="recipe-card-img-wrapper">
        <img src={image} alt={title} className="recipe-card-img" />
        <div className="save-recipe-button-wrapper" onClick={handleClickOpen}>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill={save ? "#FEE135" : "none"} stroke="#FEE135" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg> */}

          <Bookmark
            className={`w-8 h-8 ${
              save ? "fill-[#FEE135]" : ""
            } stroke-[#FEE135]`}
          />
        </div>
      </div>
      <div className="recipe-card-info-wrapper">
        <div className="recipe-card-info">
          <h3>{title}</h3>
        </div>
        <div onClick={handleClick} className="recipe-card-add">
          <img src={clicked ? check : plus} alt="Select recipe button" />
        </div>
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
    </div>
    
  );
};

export default RecipeCard;

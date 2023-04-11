import React from "react";
import "../App.css";
import "./MenuBrowse.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MenuList from "../components/MenuList";
import MenuCard from "../components/MenuCard";
import { Button } from "@mui/material";

const Menu = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState(
    Object.values(JSON.parse(window.localStorage.getItem("items")))
  );

  const test_data = [
    {
      id: 715424,
      title: "The Best Chili",
      image: "https://spoonacular.com/recipeImages/715424-312x231.jpg",
      imageType: "jpg",
    },
    {
      id: 715560,
      title: "World's Greatest Lasagna Roll Ups",
      image: "https://spoonacular.com/recipeImages/715560-312x231.jpg",
      imageType: "jpg",
    },
  ];

  return (
    <div>
      <Header back="/home" />
      <div className="your-menu-wrapper">
        <div className="your-menu-title-wrapper">
          <h1>Your Menu</h1>
        </div>
        <MenuList recipes={recipes} />
        <Button
          onClick={() => {
            navigate("/schedule");
          }}
          className="menuGenerate"
          variant="contained"
          fullWidth>
          Generate Schedule
        </Button>
      </div>
    </div>
  );
};

export default Menu;

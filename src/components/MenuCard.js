import { useState, useEffect } from "react";
import "./MenuCard.css";
import { ReactComponent as X } from "../assets/x.svg";
import minus from "../assets/minus.svg";
import plus from "../assets/plus.svg";

const MenuCard = ({ title, id, image, updateRecipes }) => {

  const handleDelete = (e) => {
    let items = JSON.parse(window.localStorage.getItem("items"))
    let index = items.findIndex((item) => item.id === id);
    
    if (index === -1) {
      console.log("error: recipe is not in list")
    } else {
      items.splice(index, 1);
      let newArray = [...items]
      window.localStorage.setItem("items", JSON.stringify(newArray));
      updateRecipes(newArray);
    }
    e.stopPropagation()
  }

  return (
    <div className="menu-card-wrapper">
      <img src={image} alt={title} className="menu-card-img" />
      <div className="menu-card-info-wrapper">
        <div className="menu-card-info">
          <h3>{title}</h3>
        </div>
        <X className="stroke-red-500 w-1/12" onClick={handleDelete} />
      </div>
    </div>
  );
};

export default MenuCard;

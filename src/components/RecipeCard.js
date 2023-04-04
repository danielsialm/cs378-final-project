import { useState, useEffect } from "react";
import "./RecipeCard.css";
import plus from "../assets/plus.svg";
import check from "../assets/check.svg";
import { useNavigate } from "react-router";

const RecipeCard = ({ title, id, image }) => {
  const navigate = useNavigate();

  let items = JSON.parse(window.localStorage.getItem("items")) || [];

  let currentItem = {}
  currentItem.title = title
  currentItem.image = image
  currentItem.id = id
  const [clicked, setClicked] = useState(items.some(item => item.id === id));
  const [used, setUsed] = useState(0);


  const handleClick = (e) => {
    setClicked(!clicked);
    setUsed(used + 1);
    e.stopPropagation()
  };

  useEffect(() => {
    if (used) {
      let items = JSON.parse(window.localStorage.getItem("items")) || [];

      let index = items.findIndex(item => item.id === id);


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
    }
  }, [used]);


  return (
    <div className="recipe-card-wrapper" onClick={() => navigate('/recipe/' + id)}>
      <img src={image} alt={title} className="recipe-card-img" />
      <div className="recipe-card-info-wrapper">
        <div className="recipe-card-info">
          <h3>{title}</h3>
        </div>
        <div onClick={handleClick} className="recipe-card-add">
          <img src={clicked ? check : plus} alt="Select recipe button" />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

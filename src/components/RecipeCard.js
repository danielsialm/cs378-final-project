import { useState, useEffect } from "react";
import "./RecipeCard.css";
import plus from "../assets/plus.svg";
import check from "../assets/check.svg";
import { useNavigate } from "react-router";
import {ReactComponent as Bookmark} from "../assets/bookmark.svg"

const RecipeCard = ({ title, id, image }) => {
  const navigate = useNavigate();

  let items = JSON.parse(window.localStorage.getItem("items")) || [];

  let currentItem = {};
  currentItem.title = title;
  currentItem.image = image;
  currentItem.id = id;
  const [clicked, setClicked] = useState(items.some((item) => item.id === id));
  const [used, setUsed] = useState(0);
  const [save, setSaved] = useState(false)

  const handleClick = (e) => {
    setClicked(!clicked);
    setUsed(used + 1);
    e.stopPropagation();
  };

  const handleSave = (e) => {

    // TODO: add code to save recipes to database

    setSaved(!save)
    e.stopPropagation();
  }

  useEffect(() => {
    if (used) {
      let items = JSON.parse(window.localStorage.getItem("items")) || [];

      let index = items.findIndex((item) => item.id === id);

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
    <div
      className="recipe-card-wrapper"
      onClick={() => navigate("/recipe/" + id)}>
      <div className="recipe-card-img-wrapper">
        <img src={image} alt={title} className="recipe-card-img" />
        <div className="save-recipe-button-wrapper" onClick={handleSave}>

          {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill={save ? "#FEE135" : "none"} stroke="#FEE135" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg> */}

          <Bookmark className={`w-8 h-8 ${save ? "fill-[#FEE135]" : ""} stroke-[#FEE135]`}/>

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
    </div>
  );
};

export default RecipeCard;

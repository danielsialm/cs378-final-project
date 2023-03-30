import { useState, useEffect } from "react";
import "./MenuCard.css";
import minus from "../assets/minus.svg";
import plus from "../assets/plus.svg";
import check from "../assets/check.svg";

const MenuCard = ({ title, id, image }) => {
  let items = JSON.parse(window.localStorage.getItem("items")) || [];

  const [clicked, setClicked] = useState(items.includes(title));
  const [used, setUsed] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleClick = () => {
    setClicked(!clicked);
    setUsed(used + 1);
  };

  const updateQuantity = (i) => {
    if(quantity == 0) return;
    setQuantity(quantity+i);
  };

  useEffect(() => {
    if (used) {
      let items = JSON.parse(window.localStorage.getItem("items")) || [];

      let index = items.indexOf(title);
      console.log(index);
      let newArray = [...items];
      if (index === -1) {
        newArray = [...items, title];
      } else {
        items.splice(index, 1);
        newArray = [...items];
      }

      console.log(newArray);
      window.localStorage.setItem("items", JSON.stringify(newArray));
    }
  }, [used]);


  return (
    <div className="menu-card-wrapper">
      <img src={image} alt={title} className="menu-card-img" />
      <div className="menu-card-info-wrapper">
        <div className="menu-card-info">
          <h3>{title}</h3>
        </div>
        <div onClick={handleClick} className="quantity">
          <img className="menu-card-minus" src={minus} alt="Decrease quantity" onClick={updateQuantity(-1)}/>
          <p className="menu-card-quantity">{quantity}</p>
          <img className="menu-card-plus" src={plus} alt="Increase quantity" onClick={updateQuantity(1)}/>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;

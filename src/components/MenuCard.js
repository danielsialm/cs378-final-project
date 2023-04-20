import { useState, useEffect } from "react";
import "./MenuCard.css";
import minus from "../assets/minus.svg";
import plus from "../assets/plus.svg";

const MenuCard = ({ title, id, image }) => {
  const [quantity, setQuantity] = useState(1);

  function increment() {
    setQuantity(prevCount => prevCount+=1);
  }

  function decrement() {
    setQuantity(function (prevCount) {
      if (prevCount > 0) {
        return (prevCount -= 1); 
      } else {
        return (prevCount = 0);
      }
    });
  }

  return (
    <div className="menu-card-wrapper">
      <img src={image} alt={title} className="menu-card-img" />
      <div className="menu-card-info-wrapper">
        <div className="menu-card-info">
          <h3>{title}</h3>
        </div>
        {/* <div className="quantity-selector-wrapper">
          <div className="decrement-quantity mr-1" onClick={decrement}>
            <img src={minus} alt="Decrement quantity" />
          </div>
          <p className="menu-card-quantity">{quantity}</p>
          <div className="increment-quantity ml-1" onClick={increment}>
            <img src={plus} alt="Increment quantity" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MenuCard;

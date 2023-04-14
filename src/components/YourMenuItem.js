import React from "react";
import { ReactComponent as X } from "../assets/x.svg";
import { useNavigate } from "react-router";


const YourMenuItem = ({id, title, reload, setReload}) => {
  const navigate = useNavigate();


  const handleDelete = () => {
    let items = JSON.parse(window.localStorage.getItem("items"))
    let index = items.findIndex((item) => item.id === id);
    
    if (index === -1) {
      console.log("error: recipe is not in list")
    } else {
      items.splice(index, 1);
      let newArray = [...items]
      window.localStorage.setItem("items", JSON.stringify(newArray));
      setReload(reload+1)
    }
  }

  return (
    <div
      className="w-full py-4 border-gray-100 shadow border-2 mb-4 rounded-lg px-2 flex justify-between items-center"
      onClick={() => navigate("/recipe/" + id)}
    >
      <h4 className="text-lg">{title}</h4>
      <X className="stroke-red-500" onClick={handleDelete} />
    </div>
  );
};

export default YourMenuItem;

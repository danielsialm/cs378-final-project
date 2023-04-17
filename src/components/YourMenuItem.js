import React from "react";
import { ReactComponent as X } from "../assets/x.svg";
import { useNavigate } from "react-router";


const YourMenuItem = ({id, title, reload, setReload}) => {
  const navigate = useNavigate();


  const handleDelete = (e) => {
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
    e.stopPropagation()
  }

  return (
    <div
      className="w-full py-4 mb-4 rounded-lg px-2 flex justify-between items-center shadow-0"
      onClick={() => navigate("/recipe/" + id)}
    >
      <h4 className="text-lg flex-wrap w-11/12">{title}</h4>
      <X className="stroke-red-500 w-1/12" onClick={handleDelete} />
    </div>
  );
};

export default YourMenuItem;

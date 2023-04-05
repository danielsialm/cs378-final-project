import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import "./Schedule.css";

const Schedule = () => {
  const navigate = useNavigate();

  const steps = [
    "Heat pan on stove",
    "Put oil in pan while heating",
    "Cook for 3 minutes",
    "Flip and cook for an additional 3 minutes",
  ];

  const Ingredients = [
    { num: "1 tbsp", name: "Olive Oil" },
    { num: "10 oz", name: "Ribeye Steak" },
    { num: "2 pinches", name: "Salt" },
    { num: "1", name: "Stove" },
  ];

  const handleFinish = () => {
    window.localStorage.setItem("items", JSON.stringify([]));
    navigate("/home");
  }

  return (
    <div className="space-y-4 mx-8">
      <Header back="/menu" />
      <div>
        <h1 className="text-4xl font-bold mb-8">Your Cooking Schedule</h1>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Ingredients and Equipment:
        </h2>
        <div className="flex flex-col w-full ">
          {Ingredients &&
            Ingredients.map((ingredient, i) => {
              return (
                <div className="w-full flex flex-row text-lg">
                  <div className="mr-2">{ingredient.num}</div>
                  <div>{ingredient.name}</div>
                </div>
              );
            })}
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
                <div className="text-2xl font-bold text-gray-700 py-2 ">
                  {step}
                </div>
              </div>
            );
          })}
      </div>
      <Button
        onClick={handleFinish}
        className="schedule-finish-button"
        fullWidth
        variant="contained">
        Click here to finish
      </Button>
    </div>
  );
};

export default Schedule;

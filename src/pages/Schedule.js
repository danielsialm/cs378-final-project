import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import "./Schedule.css";

const Schedule = () => {
  const navigate = useNavigate();
  const [ingredients_all, setIngredients] = useState([]);
  const [equipment_all, setEquipment] = useState([]);
  const [steps_fin, setStepsFin] = useState([]);
  const [time_all, setTime] = useState(0);

  const steps = [
    "Heat pan on stove",
    "Put oil in pan while heating",
    "Cook for 3 minutes",
    "Flip and cook for an additional 3 minutes",
  ];
  
  useEffect(() => {
    const scheduleItems = JSON.parse(window.localStorage.getItem("items"));

    var ingredientList = [];
    var equipmentList = [];
    var steps = [];
    var time = 0;
    scheduleItems.forEach((element) => {
      const recipeInfo = JSON.parse(window.localStorage.getItem(element.id));
      ingredientList = ingredientList.concat(recipeInfo.ingredients);
      equipmentList = equipmentList.concat(recipeInfo.equipment);
      var cookTime = parseInt(recipeInfo.time);
      var estimatedTime = cookTime * .9;
      time += estimatedTime;

      recipeInfo.stepsLong.forEach((step) => {
        const step_info = {
          stepDetail: step.step, 
          recipe_id: element.id,
          ingredient: step.ingredients.map((item) => item.name),
          equipment: step.equipment.map((item) => item.name)
        }
        steps.push(step_info);
      });

      console.log(steps);

      setIngredients(ingredientList);
      setEquipment(equipmentList);
      setStepsFin(steps);
      setTime(time);
      console.log(time);

    });
  }, []);

  const handleFinish = () => {
    window.localStorage.setItem("items", JSON.stringify([]));
    navigate("/home");
  };

  return (
    <>
      <Header back="/menu" />
      <div className="space-y-4 mx-8">
        <div>
          <h1 className="text-4xl font-bold mb-8">Your Cooking Schedule</h1>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Estimated Time: {time_all} minutes
          </h2>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Ingredients:
          </h2>
          <div className="flex flex-col w-full text-base text-gray-700 p-0.5 ps-4">
            {ingredients_all.map((item) => (
              <li className="text-base text-gray-700" key={item}>
                {item}
              </li>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-gray-700 my-4">Equipment:</h2>
          <div className="flex flex-col w-full text-base text-gray-700 p-0.5 ps-4">
            {equipment_all.map((item) => (
              <li className="text-base text-gray-700" key={item}>
                {item}
              </li>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Steps:</h2>
          {steps_fin &&
            steps_fin.map((step, i) => {
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
                    {step.stepDetail}
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
    </>
  );
};

export default Schedule;

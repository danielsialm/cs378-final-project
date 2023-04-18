import Header from "../components/Header";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

import ScheduleDropList from "../components/ScheduleDropList";
import Carousel from "nuka-carousel";

import { ReactComponent as ArrowRight } from "../assets/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { useState, useEffect } from "react";
import "./Schedule.css";
import ScheduleCarousel from "./ScheduleCarousel";

const Schedule = () => {
  const navigate = useNavigate();
  const [ingredients_all, setIngredients] = useState([]);
  const [equipment_all, setEquipment] = useState([]);
  const [steps_fin, setStepsFin] = useState([]);
  const [time_all, setTime] = useState(0);
  
  useEffect(() => {
    const scheduleItems = JSON.parse(window.localStorage.getItem("items"));
    console.log(scheduleItems);
    var ingredientList = [];
    var equipmentList = [];
    var steps = [];
    var time = 0;
    scheduleItems.forEach((element) => {
      console.log('what is the element?');
      console.log(element);
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

      setIngredients(ingredientList);
      setEquipment(equipmentList);
      setStepsFin(steps);
      setTime(time);

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Your Schedule</h1>
          <h2 className="text-xl font-semibold">Estimated Time: {time_all} minutes</h2>
        </div>
        
        <div>
          <ScheduleDropList title={"Ingredients"} data={ingredients_all} />
          <ScheduleDropList title={"Equipment"} data={equipment_all} />
          <ScheduleDropList title={"Ingredients"} data={ingredients_all} />
          <ScheduleDropList title={"Equipment"} data={equipment_all} />
        </div>

        <div className="w-full">
          <ScheduleCarousel steps={steps_fin}/>
        </div>

        {/* Old design */}
        {/* <div className="w-full flex flex-col">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Steps:</h2>
          {steps_fin &&
            steps_fin.map((step, i) => {
              return (
                <div className="flex flex-row w-full">
                  <div
                    className={`bg-blue-400 w-4 h-auto mr-4 flex flex-row items-center 
              ${i === 0 ? "rounded-t-full" : ""} ${
                      i === steps_fin.length - 1 ? "rounded-b-full" : ""
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
        </div> */}
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

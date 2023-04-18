import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import ScheduleDropList from "../components/ScheduleDropList";
import Carousel from "nuka-carousel";

import { ReactComponent as ArrowRight } from "../assets/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import "./Schedule.css";
import ScheduleCarousel from "./ScheduleCarousel";

const Schedule = () => {
  const navigate = useNavigate();

  const steps = [
    {
      instruction: "Heat pan on stove",
      ingredients: [],
      equipment: [
        { num: "1", name: "pan" },
        { num: "1", name: "stove" },
      ],
    },
    {
      instruction: "Put oil in pan while heating",
      ingredients: [{ num: "1 tbsp", name: "Olive Oil" }],
      equipment: [
        { num: "1", name: "pan" },
        { num: "1", name: "stove" },
      ],
    },
    {
      instruction: "Cook for 3 minutes",
      ingredients: [{ num: "1", name: "Ribeye Steak" }],
      equipment: [
        { num: "1", name: "pan" },
        { num: "1", name: "stove" },
      ],
    },
    {
      instruction: "Flip and cook for an additional 3 minutes",
      ingredients: [{ num: "1", name: "Ribeye Steak" }],
      equipment: [
        { num: "1", name: "pan" },
        { num: "1", name: "stove" },
      ],
    },
  ];

  const Ingredients = [
    { num: "1 tbsp", name: "Olive Oil" },
    { num: "10 oz", name: "Ribeye Steak" },
    { num: "2 pinches", name: "Salt" },
  ];

  const equipment = [
    { num: "1", name: "pan" },
    { num: "1", name: "stove" },
    { num: "1", name: "oven" },
  ];

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
          <h2 className="text-xl font-semibold">Estimated Time: 1 hour</h2>
        </div>
        <div>
          <ScheduleDropList title={"Ingredients"} data={Ingredients} />
          <ScheduleDropList title={"Equipment"} data={equipment} />
        </div>

        <div className="w-full">
          <ScheduleCarousel steps={steps}/>
        </div>

        {/* Old design */}
        {/* <div className="w-full flex flex-col">
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

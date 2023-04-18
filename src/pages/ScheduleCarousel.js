import React from "react";
import Carousel from "nuka-carousel";

import { ReactComponent as ArrowRight } from "../assets/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const ScheduleCarousel = ({ steps }) => {
  console.log(steps);
  return (
    <Carousel
      renderCenterLeftControls={({ previousSlide }) => (
        <div
          className="ml-2 h-7 w-7 flex items-center justify-center"
          onClick={previousSlide}>
          <ArrowLeft />
        </div>
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <div
          className="mr-2 h-7 w-7 flex items-center justify-center"
          onClick={nextSlide}>
          <ArrowRight />
        </div>
      )}
      defaultControlsConfig={{ pagingDotsClassName: "px-2" }}>
      {steps.map((step, i) => {
        console.log(step);
        return (
          <div className=" bg-[#ECFFEB] flex w-full flex-col pt-16 pb-20 px-10 items-center rounded-2xl">
            <h2 className="text-3xl font-bold mb-3 text-left w-full">
              {i + 1}.
            </h2>
            <h2 className="text-3xl font-bold mb-14 text-left w-full">
              {step.instruction}
            </h2>
            <div className="flex justify-between w-full">
              <div className="w-5/12">
                <h4 className="font-semibold text-lg">Ingredients</h4>
                <ul className="list-disc pl-5">
                  {step.ingredients.map((ingredient) => {
                    return (
                      <li>
                        {ingredient.num} {ingredient.name}
                      </li>
                    );
                  })}
                  {/* <li>10oz ribeye steak</li>
                  <li>ljga</li> */}
                </ul>
              </div>
              <div className="w-5/12">
                <h4 className="font-semibold text-lg">Equipment</h4>
                <ul className="list-disc pl-5">
                  {step.equipment.map((equipment) => {
                    return (
                      <li>
                        {equipment.num} {equipment.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default ScheduleCarousel;

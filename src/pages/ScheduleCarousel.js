import React from "react";
import Carousel from "nuka-carousel";
import './ScheduleCarousel.css';

import { ReactComponent as ArrowRight } from "../assets/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const ScheduleCarousel = ({ steps }) => {
  console.log(steps);
  return (
    <Carousel
      className="bg-gray-200 w-full pt-16 pb-4 rounded-2xl"
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
      )}>
      {steps.map((this_step, i) => {
        console.log(this_step);
        return (
          <div className="w-full items-center justify-between mb-2 px-16 py-3">
            <div className="flex align-left text-left float-left w-full p-0">
              <h2 className="text-2xl font-semibold mb-14 pt-1.5">
                Step {i+1}:    {this_step.stepDetail}
              </h2>
            </div>

            <div className="flex justify-between w-full">
              <div className="w-5/12">
                <h4 className="font-semibold text-lg pb-4">Ingredients</h4>
                {this_step.ingredient.length > 0 ? (
                  <>                
                    <ul className="list-disc pl-5">               
                      {this_step.ingredient.map((ingredient) => {
                        return (
                          <li>
                            {ingredient}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <p>No ingredients for this step.</p>
                )}                
              </div>
              <div className="w-5/12">
                <h4 className="font-semibold text-lg pb-4">Equipment</h4>
                {this_step.equipment.length > 0 ? (
                  <>                
                    <ul className="list-disc pl-5">               
                      {this_step.equipment.map((equipment) => {
                        return (
                          <li>
                            {equipment}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <p>No equipment for this step.</p>
                )}  
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default ScheduleCarousel;

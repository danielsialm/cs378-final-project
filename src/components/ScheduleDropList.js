import { useState } from "react";
import Collapse from "@mui/material/Collapse";

import { ReactComponent as ExpandMore } from "../assets/chevron-down.svg";
import { ReactComponent as ExpandLess } from "../assets/chevron-up.svg";

const ScheduleDropList = ({ title, data, noCap }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-5">
      <div
        className="flex justify-between items-center text-2xl font-bold pb-5"
        onClick={() => setOpen(!open)}>
        <h1>{title}</h1>
        {open ? <ExpandLess /> : <ExpandMore />}
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {noCap ? (
          data && data.map((item, i) => {
            return (
              <div className="w-full flex items-center justify-between text-lg bg-gray-100 mb-2 rounded-md px-3 py-3" key={i}>
                <div className="font-medium">{item}</div>
              </div>
            );
          })) : (
          
          data && data.map((item, i) => {
            return (
              <div className="w-full flex items-center justify-between text-lg capitalize bg-gray-100 mb-2 rounded-md px-3 py-3" key={i}>
                <div className="font-medium">{item}</div>
              </div>
            );
          }))}
        
      </Collapse>
    </div>
  );
};

export default ScheduleDropList;

import React from "react";
import Header from '../components/Header';
import { useNavigate } from "react-router";


const Schedule = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Header back='/menu'/>
      <div>
        <h1>Your Cooking Schedule</h1>
      </div>
      <div>
        <h2>Ingredients and Equipment:</h2>
        <ol>
          <li>Olive Oil</li>
          <li>10 oz. Ribeye Steak</li>
          <li>Salt</li>
          <li>Pan</li>
          <li>Stove</li>
        </ol>
      </div>
      <div>
        <ol>
          <li>Heat pan on stove</li>
          <li>Put oil in pan while heating</li>
          <li>Salt steak</li>
          <li>Cook for 3 minutes</li>
          <li>Flip and cook for an additional 3 minutes</li>
          <li>Remove from heat. Let rest for 10 minutes</li>
        </ol>
      </div>
      <button onClick= {() => {navigate('/')}}>Click here to finish</button>
    </div>
  )
}

export default Schedule;
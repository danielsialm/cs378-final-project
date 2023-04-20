import React from 'react';
import MenuCard from './MenuCard';
import { useState } from "react";

function MenuList({ recipes }) {
  const [recipeList, setRecipes] = useState(recipes);

  if (recipeList)
    return (
      recipeList.map(item =>
      <div key={item["id"]}>{
        <MenuCard 
          title={item["title"]}
          id={item["id"]}
          image={item["image"]}
          updateRecipes={setRecipes}
        />
      }</div>
      )
    )
  return null;
}
export default MenuList
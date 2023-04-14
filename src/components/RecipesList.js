import React from 'react';
import RecipeCard from './RecipeCard';


function RecipesList({ recipes }) {

  if (recipes) {

    return (
      recipes.map(item =>
      <div key={item["id"]}>{
        <RecipeCard 
          title={item["title"]}
          id={item["id"]}
          image={item["image"]}
        />
      }</div>
      )
    );
  }else {
    return;
  }
}
export default RecipesList;
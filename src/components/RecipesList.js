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
    return (
      <h2 className="text-2xl font-bold my-4">No recipes here!</h2>
    );
  }
}
export default RecipesList;
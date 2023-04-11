import React from 'react';
import RecipeCard from './RecipeCard';

function RecipesList({ recipes }) {
  if (recipes)
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
    )
  return <div>Nothing to see here...</div>;
}
export default RecipesList
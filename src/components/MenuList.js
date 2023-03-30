import React from 'react';
import MenuCard from './MenuCard';

function MenuList({ recipes }) {
  if (recipes)
    return (
      recipes.map(item =>
      <div key={item["id"]}>{
        <MenuCard 
          title={item["title"]}
          id={item["id"]}
          image={item["image"]}
        />
      }</div>
      )
    )
  return null;
}
export default MenuList
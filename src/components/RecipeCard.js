import React from 'react'
import "./RecipeCard.css"

const RecipeCard = ({item_name, time, img_src}) => {
  return (
    <div className='recipe-card-wrapper'>
      <img src={require(`../assets/${img_src}`)} className="recipe-card-img"/>
      <div className='recipe-card-info-wrapper'>
        <div className='recipe-card-info'>
          <h3>{item_name}</h3>
          <div>
            <p>{time} mins.</p>
          </div>
        </div>
        <div>
          <h1>+</h1> 
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
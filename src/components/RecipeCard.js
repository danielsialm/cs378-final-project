import { useState } from "react"
import "./RecipeCard.css"
import plus from "../assets/plus.svg"
import check from "../assets/check.svg"

const RecipeCard = ({title, id, image}) => {

  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <div className='recipe-card-wrapper'>
      <img src={image} alt={title} className="recipe-card-img"/>
      <div className='recipe-card-info-wrapper'>
        <div className='recipe-card-info'>
          <h3>{title}</h3>
        </div>
        <div onClick={handleClick} className='recipe-card-add'>
          <img src={clicked ? check : plus}/>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
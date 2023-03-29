import { useState } from "react"
import "./RecipeCard.css"
import plus from "../assets/plus.svg"
import check from "../assets/check.svg"

const RecipeCard = ({item_name, time, img_src}) => {

  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked)
  }

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
        <div onClick={handleClick} className='recipe-card-add'>
          <img src={clicked ? check : plus}/>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
import { useState } from "react"
import "./RecipeCard.css"
import plus from "../assets/plus.svg"
import check from "../assets/check.svg"
import { useEventSubscriber, useEventPublisher } from 'use-event-emitter-hook'

const RecipeCard = ({title, id, image}) => {

  let items = JSON.parse(window.localStorage.getItem('items'))

  const [clicked, setClicked] = useState(items.includes(item_name))

  let publisher = useEventPublisher()
  const handleClick = () => {
    setClicked(!clicked)
    publisher("update", item_name)
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
import {useState} from "react";
import Header from "../components/Header";
import RecipeCard from "../components/RecipeCard";
import "./RecipeBrowse.css"


const RecipeBrowse = ({page_name}) => {

  const [open, setOpen] = useState(false)
  const handleModalOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <div className="recipe-browse-wrapper">
        <Header />
        <div className="recipe-browse-title-wrapper">
          <h1>{page_name}</h1>
          <div className="recipe-browse-filter" onClick={handleModalOpen}>
            <img src={require("../assets/filter.png")}/>
          </div>
        </div>
        <div>
          <RecipeCard 
            item_name="Pizza"
            time="30"
            img_src="pizza.jpg"
          />

          <RecipeCard 
            item_name="Pan-Seared Steak"
            time="40"
            img_src="steak.jpg"
          />

          <RecipeCard 
            item_name="Baked Mac and Cheese"
            time="25"
            img_src="m&c.jpg"
          />
        </div>
      </div>
    </>
  )
}

export default RecipeBrowse;
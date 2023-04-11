import '../App.css'
import LinkCard from "../components/LinkCard";
import YourMenuItem from '../components/YourMenuItem';

import { useNavigate } from 'react-router'

import {ReactComponent as User} from "../assets/icons/user.svg"

import {ReactComponent as Search} from "../assets/icons/search.svg";
import {ReactComponent as Options} from "../assets/icons/sliders.svg";

import {ReactComponent as Edit} from "../assets/icons/edit.svg";
import {ReactComponent as Bookmark} from "../assets/icons/bookmark.svg";
import {ReactComponent as Award} from "../assets/icons/award.svg";
import {ReactComponent as Clock} from "../assets/icons/clock.svg";
import { Button } from '@mui/material';

import { useState } from 'react';
import "./Home.css"

const links = [
  {icon: Award, text: "Trending Recipes", link:"/trendingrecipes"},
  {icon: Clock, text: "Recent Recipes", link:"/recentrecipes"},
  {icon: Bookmark, text: "Saved Recipes", link:"/savedrecipes"},
  {icon: Edit, text: "My Recipes", link:"/myrecipes"}
]



 
const Home = () => {
  const navigate = useNavigate();
  const [reload, setReload] = useState(0) // Used to reload the page when you remove item from Your Menu

  return (
    <div className="w-screen h-auto md:p-8 p-4 flex flex-col items-center mb-24">
      <div className="md:w-2/3 w-full flex flex-col items-center space-y-12">
        <div className="w-full flex flex-row justify-end align-end items-center">
          <div className="w-12 h-12 rounded-full border-2 border-gray-100 shadow flex items-center justify-center">
            <User onClick={() => {navigate("/profile")}}></User>
          </div>
        </div>
        <div className="md:text-5xl text-4xl font-bold">Cook Your Way</div>
        <div className="w-full md:p-3 p-2 md:border-4 border-2 px-3 border-gray-200 bg-gray-50 rounded-3xl flex flex-row shadow">
          <Search className="w-10 h-10 text-gray-600 mr-4"></Search> 
          <input type="text" className = "active:border-none md:text-2xl text-xl outline-none grow min-w-0 bg-gray-50" placeholder="Search Recipes"></input>
          <Options className="w-10 h-10 text-gray-600 ml-4"></Options>
        </div>
        <div className="w-full flex flex-row flex-wrap">
          {links.map((link, i) => {
            return <LinkCard Icon={link.icon} text = {link.text} pr = {i%2 === 0} link={link.link} key={i}></LinkCard>
          })}
        </div>
        <div className="w-full">
          <div className="text-2xl font-bold mb-4" >Your Menu</div>

          {JSON.parse(window.localStorage.getItem('items')) && JSON.parse(window.localStorage.getItem('items')).length !== 0 ? 
          <>
            {Object.values(JSON.parse(window.localStorage.getItem('items'))).map((item) => 
            // <div key={item.id} className="w-full py-4 border-gray-100 shadow border-2 mb-4 rounded-lg px-2 flex justify-between">
            //   <h4 className="text-lg">{item.title}</h4>
            //   <X className='stroke-red-500' onClick={handleDelete}/>
            // </div>
              <YourMenuItem id={item.id} title={item.title} key={item.id} setReload={setReload} reload={setReload}/>
            )}
            <Button variant="contained" className="home-button" fullWidth onClick={() => {navigate("/menu")}}>
              View menu
            </Button>
          </>: 
          
          <div className=" font-bold text-gray-500">Nothing here yet, select recipes to get started!</div>}

          
        </div>
        
        <div className="w-full">
          <div className="text-2xl font-bold mb-4">Saved Menus</div>
        </div>
      
        
      </div>

    </div>
  )
}

export default Home;
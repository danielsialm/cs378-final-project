import React from "react";
import '../../App.css'
import LinkCard from "./LinkCard";

import {ReactComponent as User} from "../../icons/user.svg"

import {ReactComponent as Search} from "../../icons/search.svg";
import {ReactComponent as Options} from "../../icons/sliders.svg";

import {ReactComponent as Edit} from "../../icons/edit.svg";
import {ReactComponent as Bookmark} from "../../icons/bookmark.svg";
import {ReactComponent as Award} from "../../icons/award.svg";
import {ReactComponent as Clock} from "../../icons/clock.svg";



const links = [
  {icon: Award, text: "Trending Recipes"},
  {icon: Clock, text: "Recent Recipes"},
  {icon: Bookmark, text: "Saved Recipes"},
  {icon: Edit, text: "My Recipes"}
]

const Home = () => {
  return (
    <div className="w-screen h-auto md:p-8 p-4 flex flex-col items-center">
      <div className="md:w-2/3 w-full flex flex-col items-center space-y-12">
        <div className="w-full flex flex-row justify-end align-end items-center">
          <div className="w-12 h-12 rounded-full border-2 border-gray-100 shadow flex items-center justify-center">
            <User></User>
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
            return <LinkCard Icon={link.icon} text = {link.text} pr = {i%2 == 0} key={i}></LinkCard>
          })}
        </div>
        <div className="w-full">
          <div className="text-2xl font-bold mb-4">Your Menu</div>
          <div className=" font-bold text-gray-500">Nothing here yet, select recipes to get started!</div>
        </div>
        
        <div className="w-full">
          <div className="text-2xl font-bold mb-4">Saved Menus</div>
        </div>
      
        
      </div>

    </div>
  )
}

export default Home;
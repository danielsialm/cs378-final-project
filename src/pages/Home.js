import "../App.css";
import LinkCard from "../components/LinkCard";
import YourMenuItem from "../components/YourMenuItem";

import { useNavigate } from "react-router";

import { ReactComponent as User } from "../assets/icons/user.svg";

import { ReactComponent as Search } from "../assets/icons/search.svg";
import { ReactComponent as Options } from "../assets/icons/sliders.svg";

import { ReactComponent as Edit } from "../assets/icons/edit.svg";
import { ReactComponent as Bookmark } from "../assets/icons/bookmark.svg";
import { ReactComponent as Award } from "../assets/icons/award.svg";
import { ReactComponent as Clock } from "../assets/icons/clock.svg";
import { ReactComponent as RightArrow } from "../assets/arrow-right.svg";
import { Button } from "@mui/material";

import { useState, useEffect } from "react";
import "./Home.css";
import { firebaseConfig, auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [reload, setReload] = useState(0); // Used to reload the page when you remove item from Your Menu

  const [savedMenus, setSavedMenus] = useState(null);

  const getSavedMenus = () => {
    console.log(auth);
    if (!auth || !auth.currentUser) {
      console.log("no login");
      return;
    }
    fetch(
      `${firebaseConfig.databaseURL + "/" + auth.currentUser.uid}/menus.json`
    )
      .then((res) => {
        console.log(res);
        if (res.status !== 200) {
          console.log(res.statusText);
          // throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((res) => {
        if (res) {
          console.log("getData res", res);
          setSavedMenus(res);
        }
      });
  };

  let links = [
    { icon: Award, text: "Popular", link: "/trendingrecipes" },
    { icon: Clock, text: "Recent", link: "/recentrecipes" },
    { icon: Bookmark, text: "Saved", link: "/savedrecipes" },
    { icon: Edit, text: "Custom", link: "/myrecipes" },
  ];

  useEffect(() => {
    if (loading) return;
    if (user) {
      getSavedMenus();
    }
  }, [user, loading, navigate]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log("search")
      navigate(`/search/${event.target.value}`);
    }
  };

  return (
    <div className="h-auto md:p-8 py-4 mt-4 mx-6 flex flex-col items-center mb-24">
      <div className="md:w-2/3 w-full flex flex-col items-center space-y-7">
        <div className="w-full flex justify-between items-center">
          <div className="md:text-5xl text-3xl font-bold">Cook Your Way</div>
          <div className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center">
            <User
              onClick={() => {
                navigate("/profile");
              }}></User>
          </div>
        </div>
        <div className="w-full md:p-3 p-3 md:border-4 border-2 border-gray-200 bg-gray-50 rounded-lg flex flex-row items-center">
          <Search className="w-7 h-7 text-gray-600 mr-4"></Search>
          <input
            type="text"
            className="active:border-none md:text-2xl text-xl outline-none grow min-w-0 bg-gray-50"
            placeholder="Search Recipes"
            onKeyDown={handleKeyDown}
          >
          </input>
          {/* <Options className="w-10 h-10 text-gray-600 ml-4"></Options> */}
        </div>

        <div className="w-full rounded-lg bg-gray-200 px-4 py-4">
          <h1 className="text-2xl font-bold mb-4 text-">Browse Recipes</h1>
          <div className="w-full flex flex-row flex-wrap">
            {links.map((link, i) => {
              return (
                <LinkCard
                  Icon={link.icon}
                  text={link.text}
                  pr={i !== 3}
                  link={link.link}
                  key={i}></LinkCard>
              );
            })}
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold ">Your Menu</h1>
            {JSON.parse(window.localStorage.getItem("items")) &&
          JSON.parse(window.localStorage.getItem("items")).length !== 0 ?


            <div
              className="rounded-full border-2 border-gray-100 p-3"
              onClick={() => {
                navigate("/menu");
              }}>
              <RightArrow />
            </div>
            :
            <div></div>
        } 
          </div>

          {JSON.parse(window.localStorage.getItem("items")) &&
          JSON.parse(window.localStorage.getItem("items")).length !== 0 ? (
            <>
              {Object.values(
                JSON.parse(window.localStorage.getItem("items"))
              ).map((item) => (
                // <div key={item.id} className="w-full py-4 border-gray-100 shadow border-2 mb-4 rounded-lg px-2 flex justify-between">
                //   <h4 className="text-lg">{item.title}</h4>
                //   <X className='stroke-red-500' onClick={handleDelete}/>
                // </div>
                <YourMenuItem
                  id={item.id}
                  title={item.title}
                  key={item.id}
                  setReload={setReload}
                  reload={reload}
                />
              ))}
              {/* <Button
                variant="contained"
                className="home-button"
                onClick={() => {
                  navigate("/menu");
                }}>
                View menu
              </Button> */}
            </>
          ) : (
            <div className=" font-bold text-gray-500">
              Nothing here yet, add recipes to get started!
            </div>
          )}
        </div>

        <div className="w-full rounded-lg bg-gray-200 px-4 py-4">
          <div className="text-2xl font-bold mb-4">Saved Menus</div>
          {savedMenus &&
            Object.keys(savedMenus).map((menu, i) => {
              console.log(savedMenus[menu])
              return (
                <div
                  className="rounded-lg mb-4 bg-white"
                  key={i}>
                  <div className="flex items-center rounded-lg overflow-hidden">
                    {savedMenus[menu].items && savedMenus[menu].items.map((item) => {
                      let width = 100/savedMenus[menu].items.length
                      console.log(width)
                      return <div className={`h-20 min-w-[${width}%] flex justify-center items-center`}><img src={item.image}  alt="" /></div>
                    })}
                  </div>
                  <div className="px-2 py-3">

                  <h1 className="text-xl">{savedMenus[menu].name}</h1>
                  </div>
                  
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;

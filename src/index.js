import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import RecipeBrowse from './pages/RecipeBrowse';
import Menu from './pages/Menu';
import Schedule from './pages/Schedule';
import Recipe from './pages/Recipe';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Create from './pages/Create';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/trendingrecipes" element={<RecipeBrowse pageName={"Trending Recipes"}/>}/>
        <Route path="/recentrecipes" element={<RecipeBrowse pageName={"Recent Recipes"}/>}/>
        <Route path="/savedrecipes" element={<RecipeBrowse pageName={"Saved Recipes"}/>}/>
        <Route path="/myrecipes" element={<RecipeBrowse pageName={"My Recipes"}/>}/>
        <Route path='/search/:query' element = {<RecipeBrowse pageName = {"Search"}/>}/>
        <Route path="/menu" element={<Menu />}/>
        <Route path="/schedule" element={<Schedule />}/>
        <Route path="/recipe/:id" element={<Recipe />}/>
        <Route path="/create" element = {<Create/>}/>
      </Routes>
    </React.StrictMode>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

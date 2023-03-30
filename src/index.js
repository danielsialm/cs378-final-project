import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import RecipeBrowse from './pages/RecipeBrowse';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/trendingrecipes" element={<RecipeBrowse pageName={"Trending Recipes"}/>}/>
        <Route path="/recentrecipes" element={<RecipeBrowse pageName={"Recent Recipes"}/>}/>
        <Route path="/savedrecipes" element={<RecipeBrowse pageName={"Saved Recipes"}/>}/>
        <Route path="/myrecipes" element={<RecipeBrowse pageName={"My Recipes"}/>}/>
      </Routes>
    </React.StrictMode>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

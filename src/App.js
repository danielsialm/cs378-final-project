import logo from './logo.svg';
import './App.css';
import Menu from './pages/Menu.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/home/Home.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeBrowse from './pages/RecipeBrowse';

function App() {
  return (
    <>
      <div>
        <Router basename="/cs378-final-project">
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/menu" element={<Menu/>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

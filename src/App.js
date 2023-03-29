import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.js'
import Menu from './pages/Menu.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeBrowse from './pages/RecipeBrowse';

function App() {
  return (
    <>
      <RecipeBrowse page_name={"Popular Recipes"} />
    </>
  );
}

export default App;

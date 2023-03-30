import React from "react";
import '../App.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../components/Header'

const Recipe = () => {
  const { id } = useParams();
  const [name, setName] = useState(null);


  // src = 'http://api.spoonacular.com/recipes/{id}/information?apiKey=09a121a6694d4d7e8473e2226fefe82f';
  // useEffect(() => {
  //   fetch(src)
  //     .then(response => response.json())
  //     .then((data) => {
  //       setName(data["title"]);
  //     })
  //     .catch(error => console.log(error));
  // }, []);

  return (
    <div>
      <Header back={-1} />
      <p className="title-txt">
        { id }
      </p>
      <p>
        TODO: Display API information... apparently they are updating so nothing to do right now
      </p>
    </div>
  )
}

export default Recipe;
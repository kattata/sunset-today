// react
import { BrowserRouter, Route } from 'react-router-dom';
import { useState } from 'react';

// components
import Home from './components/Home';
import City from './components/City';

// libs
import axios from "axios";


function App() {

  const [coordinates, setCoordinates] = useState({
    lat: "",
    long: "",
    name: ""
  });

  const convertCity = (city) => {
    const accessKey = "c0eb1888cedfba2900c84577ae6a206a";
    const url = `http://api.positionstack.com/v1/forward?access_key=${accessKey}&query=${city}`

    axios.get(url)
      .then(res => {
        console.log(res);
        setCoordinates({
          lat: res.data.data[0].latitude,
          long: res.data.data[0].longitude,
          name: res.data.data[0].name
        })
      })


  }


  return (
    <BrowserRouter>
      <Route exact path="/">
        <Home convertCity={convertCity} />
      </Route>
      <Route path="/city/:city">
        <City coordinates={coordinates} convertCity={convertCity} />
      </Route>

    </BrowserRouter>
  );
}

export default App;

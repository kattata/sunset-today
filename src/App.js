// react
import { BrowserRouter, Route } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';

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
  const [sunsetData, setSunsetData] = useState(null);

  const initialMount = useRef(true);

  const convertCity = (city) => {
    const accessKey = "c0eb1888cedfba2900c84577ae6a206a";
    const url = `http://api.positionstack.com/v1/forward?access_key=${accessKey}&query=${city}`

    axios.get(url)
      .then(res => {
        // console.log(res);
        setCoordinates({
          lat: res.data.data[0].latitude,
          long: res.data.data[0].longitude,
          name: res.data.data[0].name
        })
      })
  }

  const getSunsetData = useCallback(
    async () => {

      try {
        const response = await axios.get(`https://api.sunrise-sunset.org/json?lat=${coordinates.lat}&lng=${coordinates.long}&formatted=0`)
        setSunsetData(response.data.results.sunset);
        // console.log(sunsetData);
      } catch (error) {
        console.log(error);
      }

    }, [coordinates.lat, coordinates.long, sunsetData]
  );

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      getSunsetData()
    }
  }, [getSunsetData]);


  return (
    <BrowserRouter>
      <Route exact path="/">
        <Home convertCity={convertCity} />
      </Route>
      <Route path="/city/:name">
        <City sunsetData={sunsetData} />
      </Route>

    </BrowserRouter>
  );
}

export default App;

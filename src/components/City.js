import { useHistory, useParams } from "react-router-dom";
import { useEffect } from 'react';

import axios from 'axios';

import sunset from "../assets/sunset.jpg";

const City = () => {

    const history = useHistory();
    const { name } = useParams();

    useEffect(() => {
        axios.get("https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today")
            .then(response => {
                // console.log(response);
            })
            .catch(error => {
                console.log(error.message);
            })
    }, [])

    const handleClick = () => {
        history.push("/");
    }

    return (
        <div className="city">
            <img src={sunset} className="sunset-background" alt="" />
            <div className="overlay"></div>
            <main>
                <div className="top">
                    <button onClick={handleClick}>Back</button>
                    <p>Sunset at 18:52</p>
                </div>
                <div className="center">
                    <h1>2:43:12</h1>
                    <h2>Until sunset in {name}</h2>

                </div>
            </main>
        </div>
    );
}

export default City;
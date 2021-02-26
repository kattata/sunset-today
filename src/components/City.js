import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from "axios";


import sunset from "../assets/sunset.jpg";

const City = ({ coordinates, convertCity }) => {

    const history = useHistory();
    const { city } = useParams();

    const [countdown, setCountdown] = useState(null);
    const [missedIt, setMissedIt] = useState(false);
    const [sunsetData, setSunsetData] = useState(null);


    const handleClick = () => {
        history.push("/");
    }

    useEffect(() => {
        convertCity(city);
    }, [city])

    // GET SUNSET DATA
    const initialMount = useRef(true);

    const getSunsetData = useCallback(
        async () => {

            try {
                const response = await axios.get(`https://api.sunrise-sunset.org/json?lat=${coordinates.lat}&lng=${coordinates.long}&formatted=0`)
                setSunsetData(response.data.results.sunset);
                // console.log(sunsetData);
            } catch (error) {
                console.log(error);
            }

        }, [coordinates.lat, coordinates.long]
    );

    useEffect(() => {
        if (initialMount.current) {
            initialMount.current = false;
        } else {
            getSunsetData()
        }
    }, [getSunsetData]);

    // COUNTDOWN
    useEffect(() => {

        let sunset = new Date(sunsetData).getTime();

        let countdownInterval = setInterval(() => {

            let now = new Date().getTime();

            let distance = (sunset - now);

            // time calculations
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // countdown
            let time = `${hours}:${minutes}:${seconds}`;
            setCountdown(time);

            if (distance < 0) {
                clearInterval(countdownInterval);
                setCountdown("00:00:00");
                setMissedIt(true);
            }
        }, 1000)

    }, [sunsetData])

    return (
        <div className="city">
            <img src={sunset} className="sunset-background" alt="" />
            <div className="overlay"></div>
            <main>
                <div className="top">
                    <button onClick={handleClick}>Back</button>
                    <p>Sunset at </p>
                </div>
                <div className="center">
                    {/* <h2>{missedIt ? <p>You missed it :( Come back tomorrow</p> : null}</h2> */}
                    {/* <h1 className={`${missedIt ? 'missed-it' : ''}`}>{countdown}</h1> */}
                    <h1>{countdown}</h1>
                    <h2>Until sunset in <span> {city} </span></h2>

                </div>
            </main>
        </div>
    );
}

export default City;
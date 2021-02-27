import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from "axios";


import sunset from "../assets/sunset.jpg";
import arrow from "../assets/left-arrow.svg";

const City = ({ coordinates, convertCity }) => {

    const history = useHistory();
    const { city } = useParams();

    // const [countdown, setCountdown] = useState("00:00:00");
    const [countdown, setCountdown] = useState({
        hours: '0',
        minutes: '0',
        seconds: '0'
    });
    const [missedIt, setMissedIt] = useState(false);
    const [sunsetData, setSunsetData] = useState(null);
    const [sunsetImage, setSunsetImage] = useState(null);
    const [loaded, setLoaded] = useState(false);

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
            // const h = hours < 10 ? ('0' + hours) : hours;
            // let time = `${h}:${minutes}:${seconds}`;
            setCountdown({
                hours,
                minutes,
                seconds
            });

            if (distance < 0) {
                clearInterval(countdownInterval);
                setCountdown({
                    hours: '0',
                    minutes: '0',
                    seconds: '0'
                });
                setMissedIt(true);
            }
        }, 1000)

    }, [sunsetData])

    const doubleDigits = () => {
        const h = countdown.hours < 10 ? ('0' + countdown.hours) : countdown.hours;
        const m = countdown.minutes < 10 ? ('0' + countdown.minutes) : countdown.minutes;
        const s = countdown.seconds < 10 ? ('0' + countdown.seconds) : countdown.seconds;
        return `${h}:${m}:${s}`;
    }

    // BACKGROUND IMAGE
    useEffect(() => {
        const accessKey = 'IVoOzXojUU_edYCTpfIKbSccTms-_l51psRtzE3UxAU';
        const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}&query=sunset%20${city}`;
        axios.get(url)
            .then(response => {
                const image = response.data.urls.regular;
                console.log(image);
                setSunsetImage(image);
                setLoaded(true);
            })
    }, [])

    return (
        <div className={!loaded ? 'loading-background city' : 'city'}>
            {loaded && <img src={sunsetImage} className="sunset-background" alt="Sunset from Unsplash" />}
            <div className="overlay"></div>
            <main>
                <div className="top">
                    <button onClick={handleClick}>
                        <img src={arrow} alt="Arrow" />
                        Back
                    </button>
                    <p>Sunset at </p>
                </div>
                <div className="center">
                    {/* <h2>{missedIt ? <p>You missed it :( Come back tomorrow</p> : null}</h2> */}
                    {/* <h1 className={`${missedIt ? 'missed-it' : ''}`}>{countdown}</h1> */}
                    <h1>{doubleDigits()}</h1>
                    <h2>Until sunset in <span> {city} </span></h2>

                </div>
            </main>
        </div>
    );
}

export default City;
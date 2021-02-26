import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';


import sunset from "../assets/sunset.jpg";

const City = ({ sunsetData }) => {

    const history = useHistory();
    const { name } = useParams();

    const [countdown, setCountdown] = useState(null);

    const handleClick = () => {
        history.push("/");
    }

    useEffect(() => {

        // sunset time
        let sunset = new Date(sunsetData).getTime();

        setInterval(() => {

            // current time
            let now = new Date().getTime();

            let distance = (sunset - now);

            // // time calculations
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // countdown
            let time = `${hours}:${minutes}:${seconds}`;
            setCountdown(time);
            console.log(time);
        }, 1000)

    }, [countdown])

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
                    <h1>{countdown}</h1>
                    {/* <h1>{countdown}</h1> */}
                    {/* <h1>{sunsetData}</h1> */}
                    <h2>Until sunset in <span> {name} </span></h2>

                </div>
            </main>
        </div>
    );
}

export default City;
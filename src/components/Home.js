import { useHistory } from "react-router-dom";
import { useState } from 'react';
// import { convertCity } from "./helpers";
import Geocode from "react-geocode";

const Home = ({ convertCity }) => {
    const history = useHistory();

    const [city, setCity] = useState("");

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        convertCity(city);

        // take city from state and go to city page
        history.push(`/city/${city}`);
    }

    return (
        <div className="home">
            <div className="background">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div className="search">
                    <h1>Sunset Today</h1>
                    <h2>We all love sunsets, so grab a friend, a camera and don't miss the moment! Find out how much time is left until sunset today at your location</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Type in city and press enter" value={city} onChange={handleChange} />
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Home;
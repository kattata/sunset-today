import { useHistory, useParams } from "react-router-dom";
// import { useEffect } from 'react';

// import axios from 'axios';

import sunset from "../assets/sunset.jpg";

const City = () => {

    const history = useHistory();
    const { name } = useParams();

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
                    <h2>Until sunset in <span> {name} </span></h2>

                </div>
            </main>
        </div>
    );
}

export default City;
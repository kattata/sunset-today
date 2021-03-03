import { useHistory } from "react-router-dom";
import { useState } from 'react';

import { motion } from 'framer-motion';

const transition = { ease: "easeOut", duration: 2 };

const Home = ({ convertCity }) => {
    const history = useHistory();

    const [city, setCity] = useState("");


    const handleChange = (e) => {
        setCity(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) {
            convertCity(city);
            history.push(`/city/${city}`);
        }
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
                    <motion.h1
                        key="h1"
                        exit={{ opacity: 0 }}
                        // whileHover={{ opacity: 0 }}
                        transition={transition}
                    >Sunset Today</motion.h1>
                    <h2>We all love sunsets, so grab a friend, a camera and don't miss the moment! Find out how much time is left until the sunset today at your location</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Type in city and press enter" value={city} onChange={handleChange} />
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Home;
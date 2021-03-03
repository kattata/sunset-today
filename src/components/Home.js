import { useHistory } from "react-router-dom";
import { useState } from 'react';

import { motion } from 'framer-motion';

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

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
                <motion.span initial={{ x: "-50%" }} exit={{ height: "300vh", width: "300vh", opacity: 1, y: "-125vh" }} transition={transition, { delay: 0.9, duration: 1.2 }}></motion.span>
                <motion.span></motion.span>
                <motion.span></motion.span>
                <motion.span></motion.span>
                <motion.span></motion.span>
                <div className="search">
                    <motion.h1
                        key="h1"
                        exit={{ opacity: 0 }}
                        transition={transition}
                    >Sunset Today
                    </motion.h1>
                    <motion.h2
                        key="h1"
                        exit={{ opacity: 0 }}
                        transition={transition, { delay: 0.3 }}
                    >We all love sunsets, so grab a friend, a camera and don't miss the moment! Find out how much time is left until the sunset today at your location
                        </motion.h2>
                    <motion.form
                        key="h1"
                        exit={{ opacity: 0 }}
                        transition={transition, { delay: 0.6 }}
                        onSubmit={handleSubmit}>
                        <input type="text" placeholder="Type in city and press enter" value={city} onChange={handleChange} />
                    </motion.form>
                </div>

            </div>
        </div >
    );
}

export default Home;
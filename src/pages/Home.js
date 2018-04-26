import React from 'react';
import './Home.css';
import bgimg from './tothemoon.jpeg'

const Home = () => {
    return (
        <div  className="pageArea" style={{textAlign: "center", fontFamily: "'Oxygen', sans-serif"}}>
            <br/>
            <h1 className="oxygen" style={{color: "#cccccc"}}>Sell Real</h1>
            <h1 className="oxygen" style={{color: "#999999"}}>Buy Real</h1>
            <h1 className="oxygen" style={{color: "#666666"}}>Pay Real</h1>
            <br/>
            <h3 className="oxygen">Join a whole new stream of paying<br/>for real stuff.</h3>
        </div>
    );
};

export default Home;
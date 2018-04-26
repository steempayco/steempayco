import React from 'react';
import './Home.css';

var DuckImage = require('./home.jpeg');

var bannerStyle = {
    width: '100vw',
    height: '100vh',
    backgroundImage: 'url(' + DuckImage + ')',
    backgroundSize: '100vw 100vh',
    backgroundPosition: 'center',
}

const Home = () => {
    return (
        <div style={bannerStyle}>
        </div>
    );
};

export default Home;
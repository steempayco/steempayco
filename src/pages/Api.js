import React from 'react';
import { Message } from 'semantic-ui-react'

import './Home.css';

const Home = () => {
    return (
        <div>
            <h2>
                Steempay API
            </h2>
            <Message size='big'>Steempay API is a PayPal like payment API, currently in development.</Message>
        </div>
    );
};

export default Home;
import React from 'react';
import './Home.css';
import { Image, Grid, Segment, Header, Button, Container, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

let backgroundStyle = {
    background: "url(/img/steempayco-background.png) no-repeat center fixed",
    backgroundSize: "cover",
    width: '100vw',
    height: '100vh',
    align: 'center',
    display: 'table-cell'
}

let markStyle = {
    top: '80px',
    maxHeight: '500px',
    align: 'middle',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100vh'
};

const Home = () => {
    var mobile = false;
    return (
        <div className="wrapper" style={backgroundStyle}>
            <Image src="/img/steempayco-mark.png" style={markStyle} />
            <Container text>
                <Header
                    as='h3'
                    content='Welcome to STEEMPAYCO!'
                    color='blue'
                    style={{
                        fontSize: mobile ? '1.5em' : '3em',
                        fontWeight: 'normal',
                        marginBottom: 0,
                        marginTop: mobile ? '1.5em' : '3em',
                    }}
                />
                <Header
                    as='h4'
                    content='Buy Real, Sell Real, Pay Real'
                    color='blue'
                    style={{
                        fontSize: mobile ? '1.5em' : '1.7em',
                        fontWeight: 'normal',
                        marginTop: mobile ? '0.5em' : '1.5em',
                    }}
                />
                <Button as={Link} to='/auth/signup' primary size='huge'>
                    Get Started
                    <Icon name='right arrow' />
                </Button>
                <div style={{height: '50px'}}></div>
            </Container>
        </div>
    );
};

export default Home;
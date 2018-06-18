import React, { Component } from 'react'
import { Button, Dropdown, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class LoginPanel extends Component {
    renderAuthenticated = () => {
        const trigger = (
            <span>
                Hello, aaaaadfs <Image avatar src={"http://localhost:3000/img/home.jpeg"} /> 
            </span>
        )
        const options = [
            { key: 'user', text: 'Account', icon: 'user' },
            { key: 'settings', text: 'Settings', icon: 'settings' },
            { key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: this.props.onLogoutRequest },
        ]
        console.log(this.props.auth)
        return (
            <div>
            <Dropdown trigger={trigger} options={options} icon={null} />
            </div>
        )
    }

    renderNotAuthenticated = () => {
        return (
            <div>
                <Button basic color='teal' size="medium" compact as={Link} to="/auth/login">Log in</Button>
                <Button color='teal' size="medium" compact as={Link} to="/auth/signup">Sign up</Button>
            </div>
        )
    }
    render() {
        return this.props.auth ? this.renderAuthenticated() : this.renderNotAuthenticated()
    }
}

export default LoginPanel;
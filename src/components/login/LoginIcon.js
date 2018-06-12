import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class LoginIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.auth);
        return this.props.auth ?
            <div>
                <Button size="small" compact circular onClick={this.props.onLogoutRequest}>Log off</Button>
            </div>
            :
            <div>
                <Button size="small" compact circular as={Link} to="/auth/login">Login</Button>
            </div>
    }
}

export default LoginIcon;
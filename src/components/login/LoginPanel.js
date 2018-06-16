import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class LoginPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        if (!this.props.loginStateChecked) {
            return null;
        }
        return this.props.auth ?
            <div>
                <Button size="medium" compact onClick={this.props.onLogoutRequest}>Log off</Button>
            </div>
            :
            <div>
                <Button basic color='teal' size="medium" compact as={Link} to="/auth/login">Log in</Button>
                <Button color='teal' size="medium" compact as={Link} to="/auth/signup">Sign up</Button>
            </div>
    }
}

export default LoginPanel;
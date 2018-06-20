import React, { Component } from 'react'
import { Button, Dropdown, Image, Icon, Confirm } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import userIcon from './user.jpg' 

class LoginPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoutConfirmOpen: false
        }
    }

    showLogoutDialog = () => {
        this.setState({logoutConfirmOpen: true})
    }

    handleLogoutConfirm = () => {
        this.props.onLogoutRequest()
        this.setState({logoutConfirmOpen: false})
    }

    handleLogoutCancel = () => {
        this.setState({logoutConfirmOpen: false})
    }

    renderAuthenticated = () => {
        let nickname = this.props.auth.attributes.nickname
        const trigger = (
                <Image avatar src={userIcon} /> 
        )

        return (
            <div>
                <Dropdown trigger={trigger} size="big">
                    <Dropdown.Menu>
                        <Dropdown.Header content={`hello, ${nickname}`} />
                        <Dropdown.Item as={Link} to="/setting">
                            <Icon name="setting"/> Settings
                        </Dropdown.Item>
                        <Dropdown.Item onClick={this.showLogoutDialog}>
                            <Icon name="sign out"/> Sign Out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Confirm open={this.state.logoutConfirmOpen}
                    onCancel={this.handleLogoutCancel}
                    onConfirm={this.handleLogoutConfirm} style={{
                        marginTop: '40px !important',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}/>
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
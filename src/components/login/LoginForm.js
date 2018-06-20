import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import { Button, Form, Grid, Header, Message, Segment, Loader, Dimmer } from 'semantic-ui-react'
import { Redirect, withRouter, Link } from 'react-router-dom';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {error: false}
    }
    handleSubmit = async event => {
        event.preventDefault();
        if (!event.target[0].value) {
            this.setState({error: "User is empty"});
            return;
        }
        if (!event.target[1].value) {
            this.setState({error: "Password is empty"});
            return;
        }
        this.props.onLoginRequest(event.target[0].value, event.target[1].value)
    }

    renderError() {
        let errorMessage = this.props.error || this.state.error;
        return errorMessage &&
            <Message negative>
                {errorMessage}
            </Message>
    }

    resendAuthCode() {
        console.log(this.email);
    }

    render() {
        if (this.props.redirectToConfirm)
            return <Redirect push to={"/auth/confirm"} />

        return this.props.auth ?
            <Redirect push to={"/"} />
            :
            <Container>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450, textAlign: 'left' }}>
                    <Header as='h2' color='teal' textAlign='center'>
                    Log-in
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            {this.renderError()}
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' defaultValue={this.props.userId} />
                            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' />
                            <Button color='teal' fluid size='large'>Login</Button>
                        </Segment>
                    </Form>
                    <Message>
                    New to us? <Link to='/auth/signup'>Sign Up</Link>
                    </Message>
                </Grid.Column>
                </Grid>
                {this.props.inProgress && (
                    <Dimmer active inverted>
                            <Loader size='large'>Loading</Loader>
                    </Dimmer>)}
            </Container>
    }
}

export default withRouter(LoginForm);
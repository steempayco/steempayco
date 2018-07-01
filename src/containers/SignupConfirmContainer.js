import { connect } from 'react-redux';
import React, { Component } from "react";

import * as actions from '../actions';

import { Container, Button, Form, Grid, Header, Message, Segment, Loader, Dimmer } from 'semantic-ui-react'
import { Redirect, withRouter } from 'react-router-dom';

class SignupConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = { error: false }
    }
    handleSubmit = async event => {
        event.preventDefault();
        if (!event.target[0].value) {
            this.setState({ error: "User is empty" });
            return;
        }
        if (!event.target[1].value) {
            this.setState({ error: "Verification code is empty" });
            return;
        }
        this.props.onSignupConfirmRequest(event.target[0].value, event.target[1].value)
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
        if (this.props.redirectToLogin) {
            return <Redirect push to={"/auth/login"} />
        }
        return this.props.auth ?
            <Redirect push to={"/"} />
            :
            <Container>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450, textAlign: 'left' }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            E-mail Confirmation
                    </Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                {this.renderError()}
                                <Form.Input fluid icon='user' iconPosition='left' value={this.props.userEmail} placeholder='E-mail address' />
                                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Verification code' />
                                <Button color='teal' fluid size='large'>Confirm</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
                {this.props.inProgress && (
                    <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>)}
            </Container>
    }
}


const mapStateToProps = ({ auth }) => {
    return {
        inProgress: auth.inProgress,
        error: auth.error,
        redirectToLogin: auth.redirectToLogin,
        userEmail: actions.getUserId()
    };
};

const mapDispatchToProps = (dispatch) => ({
    onSignupConfirmRequest: (id, code) => {
        actions.signupConfirmRequest(dispatch, id, code);
    }
})

const SignupConfirmContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SignupConfirm));

export default SignupConfirmContainer;
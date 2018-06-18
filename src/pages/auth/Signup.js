import React from 'react';
import '../PageCommon.css'

import { connect } from 'react-redux';
import * as actions from 'actions';

import { Component } from 'react';
import { Container, Button, Form, Grid, Header, Message, Segment, Loader, Dimmer } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';

class SignupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {error: false}
    }
    handleSubmit = async event => {
        event.preventDefault();
        if (!event.target[0].value) {
            this.setState({error: "Email address is empty"});
            return;
        }
        if (!event.target[1].value) {
            this.setState({error: "Nick Name is empty"});
            return;
        }
        if (!event.target[2].value) {
            this.setState({error: "First Name is empty"});
            return;
        }
        if (!event.target[3].value) {
            this.setState({error: "Last Name is empty"});
            return;
        }
        if (!event.target[4].value) {
            this.setState({error: "Password is empty"});
            return;
        }
        if (!event.target[5].value) {
            this.setState({error: "Password Confirm is empty"});
            return;
        }
        if (event.target[4].value !== event.target[5].value) {
            this.setState({error: "Confirmed password is different to the password"});
            return;
        }
        this.props.onSignupRequest(event.target[0].value, event.target[4].value, {email: event.target[0].value, nickname: event.target[1].value, given_name: event.target[2].value, family_name: event.target[3].value})
    }

    render() {
        console.log(this.props)
        if (this.props.redirectToConfirm) {
            return <Redirect push to={"/auth/confirm"} />
        }
        let error = this.props.error || this.state.error;
        return this.props.auth ?
            <Redirect push to={"/"} />
            :
            <Container>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 500, textAlign: 'left' }}>
                    <Header as='h2' color='teal' textAlign='center'>
                    Sign-up
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                    <Segment stacked>
                        <Header size='tiny'>E-mail address</Header>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                        <Header size='tiny'>Nick Name</Header>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Nick Name' />
                        <Header size='tiny'>Name</Header>
                        <Form.Group widths='equal'>
                            <Form.Input fluid placeholder='First Name' />
                            <Form.Input fluid placeholder='Last Name' />
                        </Form.Group>
                        <Header size='tiny'>Password</Header>
                        <Form.Group widths='equal'>
                            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' />
                            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password Confirm' type='password' />
                        </Form.Group>

                        {error && <Message negative>{error}</Message>}
                        <Button color='teal' fluid size='large'>
                        Submit
                        </Button>
                    </Segment>
                    </Form>
                </Grid.Column>
                </Grid>
                {this.props.inProgress && (
                    <Dimmer active inverted>
                            <Loader size='large'>Processing</Loader>
                    </Dimmer>)}
            </Container>
    }
}

const mapStateToProps = ({auth}) => {
    return {
        inProgress: auth.inProgress,
        error: auth.error,
        redirectToConfirm: auth.redirectToConfirm
    };
};

const mapDispatchToProps = (dispatch) => ({
    onSignupRequest: (id, pass, attributes) => {
        console.log(id, pass, attributes);
        actions.signupRequest(dispatch, id, pass, attributes);
    } 
})

const SignupContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupComponent);

const Signup = () => {
    return (
        <div className="responsiblePageArea">
            <SignupContainer />
        </div>
    );
};

export default Signup;
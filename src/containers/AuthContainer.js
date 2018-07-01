import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginFormContainer from 'containers/LoginFormContainer'


function mapStateToProps(state) {
    return {
        auth: state.common.auth
    };
}

class AuthContainer extends Component {
    render() {
        if (this.props.auth) {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        } else {
            return <LoginFormContainer />
        }
    }
}

export default connect(
    mapStateToProps,
)(AuthContainer);
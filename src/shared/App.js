import React, { Component } from "react";
import { Route } from 'react-router'
import { withRouter, Redirect } from 'react-router-dom';

import AppFrame from 'components/AppFrame'
import PriceFeedContainer from 'containers/PriceFeedContainer'
import { connect } from 'react-redux'
import * as actions from "../actions"
import globalConfig from 'config';


import { Home, Payment, Invoice, Sell, Price, Api, Setting, Login, Signup, Confirm, StoreLocator } from 'pages';

const leftItems = [
    { as: "a", content: "Home", key: "home" },
    { as: "a", content: "Users", key: "users" }
];
const rightItems = [
];

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorInChildren: false,
            errorDetail: {}
        }
    }
    componentDidCatch(error, info) {
        this.setState({ errorInChildren: true, errorDetail: { error, info } });
    }
    render() {
        if (this.state.errorInChildren) {
            if (globalConfig.stage === 'dev') {
                console.log(this.state.errorDetail);
            } else {
                this.props.onLogoutRequest();
                this.setState({ errorInChildren: false })
            }
            return null;
        }
        return (<div>
            <AppFrame leftItems={leftItems} rightItems={rightItems}>
                <Route exact path="/" component={Home} />
                <Route path="/pay/:id?" component={Payment} />
                <Route path="/invoice/:id?" component={Invoice} />
                <Route path="/sell/:id?" component={Sell} />
                <Route path="/api" component={Api} />
                <Route path="/price" component={Price} />
                <Route path="/setting" component={Setting} />
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/signup" component={Signup} />
                <Route path="/auth/confirm" component={Confirm} />
                <Route path="/stores"  component={StoreLocator} />
                <PriceFeedContainer />
            </AppFrame>
        </div>)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.common.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
    onLogoutRequest: () => {
        actions.logoutRequest(dispatch);
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
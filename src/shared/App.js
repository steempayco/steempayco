import React, { Component } from "react";
import { Route } from 'react-router'
import { withRouter } from 'react-router-dom';

import AppFrame from 'components/AppFrame'
import PriceFeedContainer from 'containers/PriceFeedContainer'
import { connect } from 'react-redux'

import { Home, Payment, Invoice, Price, Setting, Login, Signup, Confirm } from 'pages';
import * as actions from '../actions'


const leftItems = [
  { as: "a", content: "Home", key: "home" },
  { as: "a", content: "Users", key: "users" }
];
const rightItems = [
];

class App extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }
  render() {
    return (<div>
              <div>
                <AppFrame leftItems={leftItems} rightItems={rightItems}>
                  <Route exact path="/" component={Home} />
                      <Route path="/pay/:id?" component={Payment} />
                      <Route path="/invoice/:id?" component={Invoice} />
                      <Route path="/price" component={Price} />
                      <Route path="/setting" component={Setting} />
                      <Route path="/auth/login" component={Login} />
                      <Route path="/auth/signup" component={Signup} />
                      <Route path="/auth/confirm" component={Confirm} />
                  <PriceFeedContainer />
                </AppFrame>
              </div>
            </div>)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      auth: state.auth ? state.auth : false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCurrentUser: () => {
      actions.initAuth()(dispatch);
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
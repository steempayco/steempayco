import React, { Component } from "react";
import { Route } from 'react-router'
import { withRouter } from 'react-router-dom';

import AppFrame from 'components/AppFrame'
import PriceFeedContainer from 'containers/PriceFeedContainer'
import { connect } from 'react-redux'

import { Home, Payment, Invoice, Sell, Price, Api, Setting, Login, Signup, Confirm } from 'pages';

const leftItems = [
  { as: "a", content: "Home", key: "home" },
  { as: "a", content: "Users", key: "users" }
];
const rightItems = [
];

class App extends Component {
  render() {
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

export default withRouter(connect(mapStateToProps,)(App));
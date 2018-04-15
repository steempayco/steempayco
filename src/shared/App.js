import React from "react";
import { Router, Route } from 'react-router'
import AppFrame from 'components/AppFrame'

import { Home, Payment, Invoice, Setting } from 'pages';


const leftItems = [
  { as: "a", content: "Home", key: "home" },
  { as: "a", content: "Users", key: "users" }
];
const rightItems = [
  { as: "a", content: "Login", key: "login" },
];

const Content = () => (
    <div>
        <Route exact path="/" component={Home} />
        <Route path="/pay" component={Payment} />
        <Route path="/invoice" component={Invoice} />
        <Route path="/setting" component={Setting} />
    </div>
);

const App = () => (
  <div>
    <div>
    <AppFrame leftItems={leftItems} rightItems={rightItems}>
        <Content />
    </AppFrame>
  </div>
  </div>
);

export default App;
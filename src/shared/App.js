import React from "react";
import { Route } from 'react-router'
import AppFrame from 'components/AppFrame'
import PriceFeedContainer from 'containers/PriceFeedContainer'

import { Home, Payment, Invoice, Price, Setting } from 'pages';


const leftItems = [
  { as: "a", content: "Home", key: "home" },
  { as: "a", content: "Users", key: "users" }
];
const rightItems = [
];

const App = () => (
  <div>
    <div>
    <AppFrame leftItems={leftItems} rightItems={rightItems}>
      <Route exact path="/" component={Home} />
          <Route path="/pay/:id?" component={Payment} />
          <Route path="/invoice/:id?" component={Invoice} />
          <Route path="/price" component={Price} />
          <Route path="/setting" component={Setting} />
      <PriceFeedContainer />
    </AppFrame>
  </div>
  </div>
);

export default App;
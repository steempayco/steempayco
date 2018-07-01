import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

// Amplify
import Amplify from 'aws-amplify';
import globalConfig from 'config';

// Redux
import { createStore } from 'redux'
import reducers from './reducers';
import { Provider } from 'react-redux';

Amplify.configure(globalConfig.aws)


const store = createStore(reducers);
window.stateStore = store


ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
);

if (globalConfig.stage === 'dev') {
    console.log(globalConfig)
    console.log("Regitering development ServiceWorker")
    registerServiceWorker();
}

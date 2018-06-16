import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

// Amplify
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

// Redux
import { createStore } from 'redux'
import reducers from './reducers';
import { Provider } from 'react-redux';

Amplify.configure(aws_exports)


const store = createStore(reducers);
console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

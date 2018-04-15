import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

// Redux
import { createStore } from 'redux'
import reducers from './reducers';
import { Provider } from 'react-redux';

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

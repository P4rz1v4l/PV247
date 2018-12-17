import * as React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faComments, faFont, faAt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStar, faThumbsUp, faThumbsDown, faSmile, faImage, faFile } from '@fortawesome/free-regular-svg-icons';

import { SwitchContainer } from '../containers/Switch';

import './app.scss';

library.add(faCog, faComments, faStar, faThumbsUp, faThumbsDown, faFont, faSmile, faImage, faFile, faAt, faTimes);

const store = createStore(rootReducer, compose(applyMiddleware(thunk), (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()));

export class App extends React.PureComponent<{}, {}> {
    render(): JSX.Element {
        return (
            <Provider store={store}>
                <SwitchContainer />
            </Provider>
        );
    }
}


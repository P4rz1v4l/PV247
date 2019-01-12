import * as React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faComments, faTimes, faPaperclip, faUnderline, faBold, faItalic, faStrikethrough, faHighlighter, faSortUp, faSortDown} from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown, faImage, faFile, faFilePdf, faFileWord, faFileExcel } from '@fortawesome/free-regular-svg-icons';

import { SwitchContainer } from '../containers/Switch';

import './app.scss';

library.add(faCog, faComments, faThumbsUp, faThumbsDown, faImage, faFile, faFilePdf, faFileWord, faFileExcel, faTimes, faPaperclip, faUnderline, faBold, faItalic, faStrikethrough, faHighlighter, faSortUp, faSortDown);

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


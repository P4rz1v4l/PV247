import {rootReducer} from '../../src/reducers/rootReducer';
import {defaultState} from '../../src/model/state';
import {createStore} from 'redux';

describe('rootReducer', () => {
    it('init', () => {
        const store = createStore(rootReducer);

        expect(store.getState()).toEqual(defaultState);
    });
});

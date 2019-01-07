import {errors} from '../../src/reducers/errors';
import {Map} from 'immutable';
import {ERROR_ADD, ERROR_REMOVE} from '../../src/constants/errorsActionsTypes';

describe('errors', () => {
    it('init', () => {
        expect(errors(undefined, {})).toEqual(Map());
    });

    it('add', () => {
        expect(errors(Map(), {type: ERROR_ADD, payload: {id: '001', test: 'error'}})).toEqual(Map({'001': 'error'}));
    });

    it('remove', () => {
        expect(errors(Map({'001': 'error'}), {type: ERROR_REMOVE, payload: {id: '001'}})).toEqual(Map());
    });
});

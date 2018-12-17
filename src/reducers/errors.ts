import {Map} from 'immutable';
import {StateError} from '../model/stateErrors';
import {
    ERROR_ADD,
    ERROR_REMOVE
} from '../constants/errorsActionsTypes';


export const errors = (prevState = Map() as StateError, action: any) => {
    switch (action.type) {
        case ERROR_ADD: {
            return prevState.set(action.payload.id, action.payload.text);
        }

        case ERROR_REMOVE: {
            return prevState.remove(action.payload.id);
        }

        default:
            return prevState;
    }
};

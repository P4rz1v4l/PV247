import {ERROR_ADD, ERROR_REMOVE} from '../constants/errorsActionsTypes';
import * as uuid from 'uuid';


export const errorAdd = (text: string): any => ({
    type: ERROR_ADD,
    payload: {
        id: uuid(),
        text,
    }
});

export const errorRemove = (id: string): any => ({
    type: ERROR_REMOVE,
    payload: {
        id
    }
});

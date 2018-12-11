import { Map } from 'immutable';
import {
    USER_LOGIN_SUCCESS
} from '../constants/usersActionsTypes';

export const user = (prevState: any, action: any) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS: {
            return Map({isLogged: true, email: action.payload.email, nick: action.payload.nick, avatar: action.payload.avatar, channelsOrder: action.payload.channelsOrder, token: action.payload.token});
        }

        default:
            return prevState;
    }
};

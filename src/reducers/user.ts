import {StateUserRecord} from '../model/stateUser';
import {
    USER_LOGIN_SUCCESS, USER_UPDATE_SUCCESS
} from '../constants/usersActionsTypes';
import {STATE_DATA_CLEAR} from '../constants/appActionsTypes';

export const user = (prevState = new StateUserRecord() as StateUserRecord, action: any) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS: {
            return new StateUserRecord({isLogged: true, email: action.payload.email, nick: action.payload.nick, avatar: action.payload.avatar, channelsOrder: action.payload.channelsOrder, token: action.payload.token});
        }

        case USER_UPDATE_SUCCESS: {
            return new StateUserRecord({isLogged: true, email: prevState.email, nick: action.payload.nick, avatar: action.payload.avatar, channelsOrder: action.payload.channelsOrder, token: prevState.token});
        }

        case STATE_DATA_CLEAR: {
            return new StateUserRecord();
        }

        default:
            return prevState;
    }
};

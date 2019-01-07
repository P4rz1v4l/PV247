import {user} from '../../src/reducers/user';
import {StateUserRecord} from '../../src/model/stateUser';
import {USER_LOGIN_SUCCESS, USER_UPDATE_SUCCESS} from '../../src/constants/usersActionsTypes';
import {token, user1, user1Record, user1Updated, user1UpdatedRecord} from '../testData';

describe('user', () => {
    it('init', () => {
        expect(user(undefined, {})).toEqual(new StateUserRecord());
    });

    it('USER_LOGIN_SUCCESS', () => {
        expect(user(new StateUserRecord(), {type: USER_LOGIN_SUCCESS, payload: {email: user1.email, nick: user1.customData.nick, avatar: user1.customData.avatar, channelsOrder: user1.customData.channelsOrder, token}})).toEqual(user1Record);
    });

    it('USER_UPDATE_SUCCESS', () => {
        expect(user(user1Record, {type: USER_UPDATE_SUCCESS, payload: {email: user1.email, nick: user1Updated.customData.nick, avatar: user1Updated.customData.avatar, channelsOrder: user1Updated.customData.channelsOrder}})).toEqual(user1UpdatedRecord);
    });
});

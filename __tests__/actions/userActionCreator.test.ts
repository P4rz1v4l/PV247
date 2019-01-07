import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fetchMock from 'fetch-mock';
import {MyAppId} from '../../src/constants/myAppId';
import {channel1, token, user1} from '../testData';
import {fail400, fail404, successAuth, successUser1Data} from '../mockData';
import {APP_USER_CHANGING_NAME, APP_USER_LOGINNING} from '../../src/constants/appActionsTypes';
import {USER_LOGIN_SUCCESS, USER_UPDATE_SUCCESS} from '../../src/constants/usersActionsTypes';
import {userChangeNick, userLogin} from '../../src/actions/userActionCreator';
import {ERROR_ADD} from '../../src/constants/errorsActionsTypes';

const mockStore = configureMockStore([thunk]);

describe('userLogin', () => {
    const store = mockStore({app: {actualChannelId: channel1.id}, user: {token}});

    beforeEach(() => {
        store.clearActions();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it('fail fetchUserLogin', () => {
        fetchMock.post('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user', fail400);
        fetchMock.post('https://pv247messaging.azurewebsites.net/api/v2/auth', fail400);
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user1.email, successUser1Data);

        const expectedActions = [
            {type: APP_USER_LOGINNING, payload: {userLoginning: true}},
            {type: ERROR_ADD, payload: {text: 'Error: Login account'}},
            {type: APP_USER_LOGINNING, payload: {userLoginning: false}},
        ];

        return store.dispatch(userLogin(user1.email)).then(() => {
            expect(expectedActions[0]).toEqual(store.getActions()[0]);
            expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
            expect(expectedActions[2]).toEqual(store.getActions()[2]);
        });
    });

    it('fail fetchUserInfo', () => {
        fetchMock.post('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user', fail400);
        fetchMock.post('https://pv247messaging.azurewebsites.net/api/v2/auth', successAuth);
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user1.email, fail400);

        const expectedActions = [
            {type: APP_USER_LOGINNING, payload: {userLoginning: true}},
            {type: ERROR_ADD, payload: {text: 'Error: Login account'}},
            {type: APP_USER_LOGINNING, payload: {userLoginning: false}},
        ];

        return store.dispatch(userLogin(user1.email)).then(() => {
            expect(expectedActions[0]).toEqual(store.getActions()[0]);
            expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
            expect(expectedActions[2]).toEqual(store.getActions()[2]);
        });
    });

    it('success with fail fetchUserSignup', () => {
        fetchMock.post('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user', fail400);
        fetchMock.post('https://pv247messaging.azurewebsites.net/api/v2/auth', successAuth);
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user1.email, successUser1Data);

        const expectedActions = [
            {type: APP_USER_LOGINNING, payload: {userLoginning: true}},
            {type: USER_LOGIN_SUCCESS, payload: {email: user1.email, nick: user1.customData.nick, avatar: user1.customData.avatar, channelsOrder: user1.customData.channelsOrder, token}},
            {type: APP_USER_LOGINNING, payload: {userLoginning: false}},
        ];

        return store.dispatch(userLogin(user1.email)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('userChangeNick', () => {
    const store = mockStore({app: {actualChannelId: channel1.id}, user: {token, email: user1.email}});

    beforeEach(() => {
        store.clearActions();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it('success', () => {
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user1.email, successUser1Data);
        fetchMock.put('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user1.email, successUser1Data);

        const expectedActions = [
            {type: APP_USER_CHANGING_NAME, payload: {userChangingName: true}},
            {type: USER_UPDATE_SUCCESS, payload: {email: user1.email, nick: user1.customData.nick, avatar: user1.customData.avatar, channelsOrder: user1.customData.channelsOrder}},
            {type: APP_USER_CHANGING_NAME, payload: {userChangingName: false}},
        ];

        return store.dispatch(userChangeNick(user1.customData.nick)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('fail', () => {
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user1.email, fail404);

        const expectedActions = [
            {type: APP_USER_CHANGING_NAME, payload: {userChangingName: true}},
            {type: ERROR_ADD, payload: {text: 'Error: Edit nick'}},
            {type: APP_USER_CHANGING_NAME, payload: {userChangingName: false}},
        ];

        return store.dispatch(userChangeNick(user1.customData.nick)).then(() => {
            expect(expectedActions[0]).toEqual(store.getActions()[0]);
            expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
            expect(expectedActions[2]).toEqual(store.getActions()[2]);
        });
    });
});

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fetchMock from 'fetch-mock';
import {defaultState} from '../../src/model/state';
import {MyAppId} from '../../src/constants/myAppId';
import {channel1, messagesArrayResponse} from '../testData';
import {fail404, successChannel1Data, successMessages} from '../mockData';
import {changeChannel} from '../../src/actions/appActionCreator';
import {APP_CHANNEL_CHANGE, APP_MESSAGES_LOADING} from '../../src/constants/appActionsTypes';
import {MESSAGES_LOAD_SUCCESS} from '../../src/constants/messagesActionsTypes';
import {ERROR_ADD} from '../../src/constants/errorsActionsTypes';

const mockStore = configureMockStore([thunk]);
const store = mockStore(defaultState);

describe('changeChannel', () => {
    beforeEach(() => {
        store.clearActions();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it('success with empty channelId', () => {
        const expectedActions = [
            {type: APP_CHANNEL_CHANGE, payload: {channelsId: ''}}
        ];

        store.dispatch(changeChannel(''));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('success with channelId', () => {
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, successChannel1Data);
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id + '/message', successMessages);

        const expectedActions = [
            {type: APP_CHANNEL_CHANGE, payload: {channelsId: channel1.id}},
            {type: APP_MESSAGES_LOADING, payload: {messagesLoading: true}},
            {type: MESSAGES_LOAD_SUCCESS, payload: {messages: messagesArrayResponse}},
            {type: APP_MESSAGES_LOADING, payload: {messagesLoading: false}},
        ];

        return store.dispatch(changeChannel(channel1.id)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('fail on load message', () => {
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, successChannel1Data);
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id + '/message', fail404);

        const expectedActions = [
            {type: APP_CHANNEL_CHANGE, payload: {channelsId: channel1.id}},
            {type: APP_MESSAGES_LOADING, payload: {messagesLoading: true}},
            {type: ERROR_ADD, payload: {text: 'Error: load messages'}},
            {type: APP_MESSAGES_LOADING, payload: {messagesLoading: false}},
        ];

        return store.dispatch(changeChannel(channel1.id)).then(() => {
            expect(expectedActions[0]).toEqual(store.getActions()[0]);
            expect(expectedActions[1]).toEqual(store.getActions()[1]);
            expect(store.getActions()[2]).toMatchObject(expectedActions[2]);
            expect(expectedActions[3]).toEqual(store.getActions()[3]);
        });
    });

    it('fail on load channel', () => {
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, fail404);

        const expectedActions = [
            {type: ERROR_ADD, payload: {text: 'Error: change channel'}},
        ];

        return store.dispatch(changeChannel(channel1.id)).then(() => {
            expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
        });
    });
});

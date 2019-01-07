import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fetchMock from 'fetch-mock';
import {MyAppId} from '../../src/constants/myAppId';
import {channel1, messagesArrayResponse, newMessageWithAttachmentsResponse, newMessageWithoutAttachments, token} from '../testData';
import {fail400, fail404, successMessages, successNewMessageWithAttachments} from '../mockData';
import {APP_MESSAGE_SENDING, APP_MESSAGE_UPDATING} from '../../src/constants/appActionsTypes';
import {sendMessage, updateLoadedMessages, updateMessage} from '../../src/actions/messagesActionCreators';
import {ERROR_ADD} from '../../src/constants/errorsActionsTypes';
import {MESSAGE_UPDATE_SUCCESS, MESSAGES_UPDATE_SUCCESS} from '../../src/constants/messagesActionsTypes';

const mockStore = configureMockStore([thunk]);

describe('sendMessage', () => {
    const store = mockStore({app: {actualChannelId: channel1.id}, user: {token}});

    beforeEach(() => {
        store.clearActions();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it('success', () => {
        fetchMock.post('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id + '/message', successMessages);

        const expectedActions = [
            {type: APP_MESSAGE_SENDING, payload: {messageSending: true}},
            {type: APP_MESSAGE_SENDING, payload: {messageSending: false}},
        ];

        return store.dispatch(sendMessage(newMessageWithoutAttachments.value, newMessageWithoutAttachments.customData.attachments)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('fail', () => {
        fetchMock.post('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id + '/message', fail400);

        const expectedActions = [
            {type: APP_MESSAGE_SENDING, payload: {messageSending: true}},
            {type: ERROR_ADD, payload: {text: 'Error: Send Message'}},
            {type: APP_MESSAGE_SENDING, payload: {messageSending: false}},
        ];

        return store.dispatch(sendMessage(newMessageWithoutAttachments.value, newMessageWithoutAttachments.customData.attachments)).then(() => {
            expect(expectedActions[0]).toEqual(store.getActions()[0]);
            expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
            expect(expectedActions[2]).toEqual(store.getActions()[2]);
        });
    });
});


describe('updateLoadedMessages', () => {
    const store = mockStore({app: {actualChannelId: channel1.id}, user: {token}});

    beforeEach(() => {
        store.clearActions();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it('success', () => {
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id + '/message', successMessages);

        const expectedActions = [
            {type: MESSAGES_UPDATE_SUCCESS, payload: {messages: messagesArrayResponse}},
        ];

        return store.dispatch(updateLoadedMessages()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});


describe('updateMessage', () => {
    const store = mockStore({app: {actualChannelId: channel1.id}, user: {token}});

    beforeEach(() => {
        store.clearActions();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it('success', () => {
        fetchMock.put('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id + '/message/' + newMessageWithAttachmentsResponse.id, successNewMessageWithAttachments);

        const expectedActions = [
            {type: APP_MESSAGE_UPDATING, payload: {messageUpdating: true}},
            {type: MESSAGE_UPDATE_SUCCESS, payload: {message: newMessageWithAttachmentsResponse}},
            {type: APP_MESSAGE_UPDATING, payload: {messageUpdating: false}},
        ];

        return store.dispatch(updateMessage(newMessageWithoutAttachments, newMessageWithAttachmentsResponse.id)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('fail', () => {
        fetchMock.put('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id + '/message/' + newMessageWithAttachmentsResponse.id, fail404);

        const expectedActions = [
            {type: APP_MESSAGE_UPDATING, payload: {messageUpdating: true}},
            {type: ERROR_ADD, payload: {text: 'Error: Update Message'}},
            {type: APP_MESSAGE_UPDATING, payload: {messageUpdating: false}},
        ];

        return store.dispatch(updateMessage(newMessageWithoutAttachments, newMessageWithAttachmentsResponse.id)).then(() => {
            expect(expectedActions[0]).toEqual(store.getActions()[0]);
            expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
            expect(expectedActions[2]).toEqual(store.getActions()[2]);
        });
    });
});

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fetchMock from 'fetch-mock';
import {MyAppId} from '../../src/constants/myAppId';
import {channel1, channel2, channelsArrayResponse, token, user1} from '../testData';
import {fail400, fail404, successChannel1Data, successChannel2Data, successChannels, successMessages} from '../mockData';
import {APP_CHANNEL_CHANGE, APP_CHANNEL_CREATING, APP_CHANNEL_UPDATING, APP_CHANNELS_LOADING} from '../../src/constants/appActionsTypes';
import {ERROR_ADD} from '../../src/constants/errorsActionsTypes';
import {channelCreate, channelInvite, channelLeave, channelsFetch, channelsLoadedUpdate, channelUpdate} from '../../src/actions/channelsActionCreator';
import {CHANNEL_CREATE_SUCCESS, CHANNEL_UPDATE_SUCCESS, CHANNELS_FETCH_SUCCESS, CHANNELS_UPDATE_SUCCESS} from '../../src/constants/channelsActionsTypes';

const mockStore = configureMockStore([thunk]);

describe('channelsFetch', () => {
    const store = mockStore({app: {actualChannelId: channel1.id}, user: {token}});

    beforeEach(() => {
        store.clearActions();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it('success', () => {
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel', successChannels);

        const expectedActions = [
            {type: APP_CHANNELS_LOADING, payload: {channelLoading: true}},
            {type: CHANNELS_FETCH_SUCCESS, payload: {channels: channelsArrayResponse}},
            {type: APP_CHANNELS_LOADING, payload: {channelLoading: false}},
        ];

        return store.dispatch(channelsFetch()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('fail', () => {
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel', fail404);

        const expectedActions = [
            {type: APP_CHANNELS_LOADING, payload: {channelLoading: true}},
            {type: ERROR_ADD, payload: {text: 'Error: load channel'}},
        ];

        return store.dispatch(channelsFetch()).then(() => {
            expect(expectedActions[0]).toEqual(store.getActions()[0]);
            expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
            expect(expectedActions[2]).toEqual(store.getActions()[2]);
        });
    });
});


describe('channelsLoadedUpdate', () => {
    const store = mockStore({app: {actualChannelId: channel1.id}, user: {token}});

    beforeEach(() => {
        store.clearActions();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it('success', () => {
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel', successChannels);

        const expectedActions = [
            {type: CHANNELS_UPDATE_SUCCESS, payload: {channels: channelsArrayResponse}},
        ];

        return store.dispatch(channelsLoadedUpdate()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});


describe('channelCreate', () => {
    const store = mockStore({app: {actualChannelId: channel1.id}, user: {token}});

    beforeEach(() => {
        store.clearActions();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it('success', () => {
        fetchMock.post('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel', successChannel1Data);
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, successChannel1Data);
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id + '/message', successMessages);

        const expectedActions = [
            {type: APP_CHANNEL_CREATING, payload: {channelCreating: true}},
            {type: CHANNEL_CREATE_SUCCESS, payload: {channel: channel1}},
            {type: APP_CHANNEL_CREATING, payload: {channelCreating: false}},
        ];

        return store.dispatch(channelCreate(channel1.name, channel1.customData.description)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('fail', () => {
        fetchMock.post('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel', fail400);

        const expectedActions = [
            {type: APP_CHANNEL_CREATING, payload: {channelCreating: true}},
            {type: ERROR_ADD, payload: {text: 'Error: Create channel'}},
            {type: APP_CHANNEL_CREATING, payload: {channelCreating: false}},
        ];

        return store.dispatch(channelCreate(channel1.name, channel1.customData.description)).then(() => {
            expect(expectedActions[0]).toEqual(store.getActions()[0]);
            expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
            expect(expectedActions[2]).toEqual(store.getActions()[2]);
        });
    });
});

describe('channelUpdate', () => {
    const store = mockStore({app: {actualChannelId: channel1.id}, user: {token}});

    beforeEach(() => {
        store.clearActions();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it('success', () => {
        fetchMock.put('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, successChannel1Data);

        const expectedActions = [
            {type: APP_CHANNEL_UPDATING, payload: {channelUpdating: true}},
            {type: CHANNEL_UPDATE_SUCCESS, payload: {channel: channel1}},
            {type: APP_CHANNEL_UPDATING, payload: {channelUpdating: false}},
        ];

        return store.dispatch(channelUpdate(channel1)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('fail', () => {
        fetchMock.put('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, fail400);

        const expectedActions = [
            {type: APP_CHANNEL_UPDATING, payload: {channelUpdating: true}},
            {type: ERROR_ADD, payload: {text: 'Error: Update channel'}},
            {type: APP_CHANNEL_UPDATING, payload: {channelUpdating: false}},
        ];

        return store.dispatch(channelUpdate(channel1)).then(() => {
            expect(expectedActions[0]).toEqual(store.getActions()[0]);
            expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
            expect(expectedActions[2]).toEqual(store.getActions()[2]);
        });
    });
});

describe('channelLeave', () => {
    const store = mockStore({app: {actualChannelId: channel1.id}, user: {email: user1.email, token}});

    beforeEach(() => {
        store.clearActions();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it('success without channel contained user1', () => {
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel2.id, successChannel2Data);

        const expectedActions = [
            {type: APP_CHANNEL_CHANGE, payload: {channelsId: ''}},
        ];

        return store.dispatch(channelLeave(channel2.id)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('success with channel contained user1', () => {
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, successChannel1Data);
        fetchMock.put('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, successChannel1Data);

        const expectedActions = [
            {type: APP_CHANNEL_CHANGE, payload: {channelsId: ''}},
            {type: CHANNEL_UPDATE_SUCCESS, payload: {channel: channel1}},
        ];

        return store.dispatch(channelLeave(channel1.id)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('fail fetchChannelInfo', () => {
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, fail404);

        const expectedActions = [
            {type: APP_CHANNEL_CHANGE, payload: {channelsId: ''}},
            {type: ERROR_ADD, payload: {text: 'Error: Leave channel'}},
        ];

        return store.dispatch(channelLeave(channel1.id)).then(() => {
            expect(store.getActions()[0]).toEqual(expectedActions[0]);
            expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
        });
    });

    it('fail fetchChannelUpdate', () => {
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, successChannel1Data);
        fetchMock.put('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, fail404);

        const expectedActions = [
            {type: APP_CHANNEL_CHANGE, payload: {channelsId: ''}},
            {type: ERROR_ADD, payload: {text: 'Error: Leave channel'}},
        ];

        return store.dispatch(channelLeave(channel1.id)).then(() => {
            expect(store.getActions()[0]).toEqual(expectedActions[0]);
            expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
        });
    });
});

describe('channelInvite', () => {
    const store = mockStore({app: {actualChannelId: channel2.id}, user: {email: user1.email, token}});

    beforeEach(() => {
        store.clearActions();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it('success', () => {
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel2.id, successChannel2Data);
        fetchMock.put('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel2.id, successChannel2Data);

        const expectedActions = [
            {type: CHANNEL_UPDATE_SUCCESS, payload: {channel: channel2}},
        ];

        return store.dispatch(channelInvite(user1.email)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('fail', () => {
        fetchMock.get('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel2.id, fail404);

        const expectedActions = [
            {type: ERROR_ADD, payload: {text: 'Error: Invite channel'}},
        ];

        return store.dispatch(channelInvite(user1.email)).then(() => {
            expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
        });
    });
});

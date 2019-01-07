import * as fetchMock from 'fetch-mock';
import { MyAppId } from '../../src/constants/myAppId';
import {channelId, messagesArrayResponse, token} from '../testData';
import {fail404, successMessages} from '../mockData';
import {ApiError} from '../../src/model/apiError';
import {IMessage} from '../../src/model/stateMessages';
import {fetchMessagesInfo} from '../../src/util/fetchMessagesInfo';


describe('fetchMessagesInfo', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('success', async () => {
        fetchMock.getOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channelId + '/message', successMessages);

        return fetchMessagesInfo(channelId, token)
            .then((data: IMessage) => {
                expect(data).toEqual(messagesArrayResponse);
            });
    });

    it('fail', async () => {
        fetchMock.getOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channelId + '/message', fail404);

        return fetchMessagesInfo(channelId, token)
            .catch((data: ApiError) => {
                expect(data).toBeInstanceOf(ApiError);
                expect(data.getCode()).toBe(404);
            });
    });
});

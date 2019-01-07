import * as fetchMock from 'fetch-mock';
import { MyAppId } from '../../src/constants/myAppId';
import {channelId, newMessageWithAttachments, newMessageWithAttachmentsResponse, newMessageWithoutAttachments, newMessageWithoutAttachmentsResponse, token} from '../testData';
import {fail400, fail404, successNewMessageWithAttachments, successNewMessageWithoutAttachments} from '../mockData';
import {ApiError} from '../../src/model/apiError';
import {IMessage} from '../../src/model/stateMessages';
import {fetchMessageUpdate} from '../../src/util/fetchMessageUpdate';


describe('fetchMessageUpdate', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('success without attachments', async () => {
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channelId + '/message/' + newMessageWithoutAttachmentsResponse.id, successNewMessageWithoutAttachments);
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channelId + '/message/' + newMessageWithAttachmentsResponse.id, successNewMessageWithAttachments);

        return fetchMessageUpdate(newMessageWithoutAttachments, newMessageWithoutAttachmentsResponse.id, channelId, token)
            .then((data: IMessage) => {
                expect(data).toEqual(newMessageWithoutAttachmentsResponse);
            });
    });

    it('success with attachments', async () => {
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channelId + '/message/' + newMessageWithoutAttachmentsResponse.id, successNewMessageWithoutAttachments);
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channelId + '/message/' + newMessageWithAttachmentsResponse.id, successNewMessageWithAttachments);

        return fetchMessageUpdate(newMessageWithAttachments, newMessageWithAttachmentsResponse.id, channelId, token)
            .then((data: IMessage) => {
                expect(data).toEqual(newMessageWithAttachmentsResponse);
            });
    });

    it('fail400', async () => {
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channelId + '/message/' + newMessageWithoutAttachmentsResponse.id, fail400);

        return fetchMessageUpdate(newMessageWithoutAttachments, newMessageWithoutAttachmentsResponse.id, channelId, token)
            .catch((data: ApiError) => {
                expect(data).toBeInstanceOf(ApiError);
                expect(data.getCode()).toBe(400);
            });
    });

    it('fail404', async () => {
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channelId + '/message/' + newMessageWithoutAttachmentsResponse.id, fail404);

        return fetchMessageUpdate(newMessageWithoutAttachments, newMessageWithoutAttachmentsResponse.id, channelId, token)
            .catch((data: ApiError) => {
                expect(data).toBeInstanceOf(ApiError);
                expect(data.getCode()).toBe(404);
            });
    });
});

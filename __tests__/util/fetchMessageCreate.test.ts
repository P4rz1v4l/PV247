import * as fetchMock from 'fetch-mock';
import { MyAppId } from '../../src/constants/myAppId';
import {channelId, newMessageWithAttachments, newMessageWithAttachmentsResponse, newMessageWithoutAttachments, newMessageWithoutAttachmentsResponse, token} from '../testData';
import {fail400, fail404, successNewMessageWithAttachments, successNewMessageWithoutAttachments} from '../mockData';
import {ApiError} from '../../src/model/apiError';
import {fetchMessageCreate} from '../../src/util/fetchMessageCreate';
import {IMessage} from '../../src/model/stateMessages';


describe('fetchMessageCreate', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('success without attachments', async () => {
        fetchMock.postOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channelId + '/message', successNewMessageWithoutAttachments);

        return fetchMessageCreate(newMessageWithoutAttachments.value, newMessageWithoutAttachments.customData.attachments, channelId, token)
            .then((data: IMessage) => {
                expect(data).toEqual(newMessageWithoutAttachmentsResponse);
            });
    });

    it('success with attachments', async () => {
        fetchMock.postOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channelId + '/message', successNewMessageWithAttachments);

        return fetchMessageCreate(newMessageWithAttachments.value, newMessageWithAttachments.customData.attachments, channelId, token)
            .then((data: IMessage) => {
                expect(data).toEqual(newMessageWithAttachmentsResponse);
            });
    });

    it('fail400', async () => {
        fetchMock.postOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channelId + '/message', fail400);

        return fetchMessageCreate(newMessageWithoutAttachments.value, newMessageWithoutAttachments.customData.attachments, channelId, token)
            .catch((data: ApiError) => {
                expect(data).toBeInstanceOf(ApiError);
                expect(data.getCode()).toBe(400);
            });
    });

    it('fail404', async () => {
        fetchMock.postOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channelId + '/message', fail404);

        return fetchMessageCreate(newMessageWithoutAttachments.value, newMessageWithoutAttachments.customData.attachments, channelId, token)
            .catch((data: ApiError) => {
                expect(data).toBeInstanceOf(ApiError);
                expect(data.getCode()).toBe(404);
            });
    });
});

import * as fetchMock from 'fetch-mock';
import { MyAppId } from '../../src/constants/myAppId';
import {channel1, token} from '../testData';
import {fail400, fail404, successChannel1Data} from '../mockData';
import {ApiError} from '../../src/model/apiError';
import {fetchChannelCreate} from '../../src/util/fetchChannelCreate';
import {IChannel} from '../../src/model/stateChannels';


describe('fetchChannelCreate', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('success', async () => {
        fetchMock.postOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel', successChannel1Data);

        return fetchChannelCreate(channel1.name, channel1.customData, token)
            .then((data: IChannel) => {
                expect(data).toEqual(channel1);
            });
    });

    it('fail400', async () => {
        fetchMock.postOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel', fail400);

        return fetchChannelCreate(channel1.name, channel1.customData, token)
            .catch((data: ApiError) => {
                expect(data).toBeInstanceOf(ApiError);
                expect(data.getCode()).toBe(400);
            });
    });

    it('fail404', async () => {
        fetchMock.postOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel', fail404);

        return fetchChannelCreate(channel1.name, channel1.customData, token)
            .catch((data: ApiError) => {
                expect(data).toBeInstanceOf(ApiError);
                expect(data.getCode()).toBe(404);
            });
    });
});

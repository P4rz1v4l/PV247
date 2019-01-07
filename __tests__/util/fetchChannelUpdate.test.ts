import * as fetchMock from 'fetch-mock';
import { MyAppId } from '../../src/constants/myAppId';
import {channel1, channel2, token} from '../testData';
import {fail400, fail404, successChannel1Data, successChannel2Data} from '../mockData';
import {ApiError} from '../../src/model/apiError';
import {IChannel} from '../../src/model/stateChannels';
import {fetchChannelUpdate} from '../../src/util/fetchChannelUpdate';


describe('fetchChannelUpdate', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('success channel1', async () => {
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, successChannel1Data);
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel2.id, successChannel2Data);

        return fetchChannelUpdate(channel1, token)
            .then((data: IChannel) => {
                expect(data).toEqual(channel1);
            });
    });

    it('success channel2', async () => {
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, successChannel1Data);
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel2.id, successChannel2Data);

        return fetchChannelUpdate(channel2, token)
            .then((data: IChannel) => {
                expect(data).toEqual(channel2);
            });
    });

    it('fail400', async () => {
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, fail400);

        return fetchChannelUpdate(channel1, token)
            .catch((data: ApiError) => {
                expect(data).toBeInstanceOf(ApiError);
                expect(data.getCode()).toBe(400);
            });
    });

    it('fail404', async () => {
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, fail404);

        return fetchChannelUpdate(channel1, token)
            .catch((data: ApiError) => {
                expect(data).toBeInstanceOf(ApiError);
                expect(data.getCode()).toBe(404);
            });
    });
});

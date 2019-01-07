import * as fetchMock from 'fetch-mock';
import { MyAppId } from '../../src/constants/myAppId';
import {channel1, channel2, token} from '../testData';
import {fail404, successChannel1Data, successChannel2Data} from '../mockData';
import {ApiError} from '../../src/model/apiError';
import {IChannel} from '../../src/model/stateChannels';
import {fetchChannelInfo} from '../../src/util/fetchChannelInfo';


describe('fetchChannelInfo', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('success channel1', async () => {
        fetchMock.getOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, successChannel1Data);
        fetchMock.getOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel2.id, successChannel2Data);

        return fetchChannelInfo(channel1.id, token)
            .then((data: IChannel) => {
                expect(data).toEqual(channel1);
            });
    });

    it('success channel2', async () => {
        fetchMock.getOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, successChannel1Data);
        fetchMock.getOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel2.id, successChannel2Data);

        return fetchChannelInfo(channel2.id, token)
            .then((data: IChannel) => {
                expect(data).toEqual(channel2);
            });
    });

    it('fail404', async () => {
        fetchMock.getOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel1.id, fail404);

        return fetchChannelInfo(channel1.id, token)
            .catch((data: ApiError) => {
                expect(data).toBeInstanceOf(ApiError);
                expect(data.getCode()).toBe(404);
            });
    });
});

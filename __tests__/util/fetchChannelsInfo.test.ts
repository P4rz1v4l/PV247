import * as fetchMock from 'fetch-mock';
import { MyAppId } from '../../src/constants/myAppId';
import {channelsArrayResponse, token} from '../testData';
import {fail404, successChannels} from '../mockData';
import {ApiError} from '../../src/model/apiError';
import {IChannel} from '../../src/model/stateChannels';
import {fetchChannelsInfo} from '../../src/util/fetchChannelsInfo';


describe('fetchChannelsInfo', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('success', async () => {
        fetchMock.getOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel', successChannels);

        return fetchChannelsInfo(token)
            .then((data: IChannel[]) => {
                expect(data).toEqual(channelsArrayResponse);
            });
    });

    it('fail404', async () => {
        fetchMock.getOnce('https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel', fail404);

        return fetchChannelsInfo(token)
            .catch((data: ApiError) => {
                expect(data).toBeInstanceOf(ApiError);
                expect(data.getCode()).toBe(404);
            });
    });
});

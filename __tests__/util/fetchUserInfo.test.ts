import * as fetchMock from 'fetch-mock';
import { MyAppId } from '../../src/constants/myAppId';
import {fetchUserInfo} from '../../src/util/fetchUserInfo';
import {token, user1, user2} from '../testData';
import {fail400, successUser1Data, successUser2Data} from '../mockData';
import {IApiUser} from '../../src/util/apiInterfaces';
import {ApiError} from '../../src/model/apiError';


describe('fetchUserInfo', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('success user1', async () => {
        fetchMock.getOnce('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user1.email, successUser1Data);
        fetchMock.getOnce('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user2.email, successUser2Data);

        return fetchUserInfo(user1.email, token)
            .then((data: IApiUser) => {
                expect(data).toEqual(user1);
            });
    });

    it('success user2', async () => {
        fetchMock.getOnce('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user1.email, successUser1Data);
        fetchMock.getOnce('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user2.email, successUser2Data);

        return fetchUserInfo(user2.email, token)
            .then((data: IApiUser) => {
                expect(data).toEqual(user2);
            });
    });

    it('fail400', async () => {
        fetchMock.getOnce('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user1.email, fail400);

        return fetchUserInfo(user1.email, token)
            .catch((data: ApiError) => {
                expect(data).toBeInstanceOf(ApiError);
                expect(data.getCode()).toBe(400);
            });
    });
});

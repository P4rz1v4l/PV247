import * as fetchMock from 'fetch-mock';
import { MyAppId } from '../../src/constants/myAppId';
import {token, user1, user2} from '../testData';
import {fail400, successUser1Data, successUser2Data} from '../mockData';
import {IApiUser} from '../../src/util/apiInterfaces';
import {ApiError} from '../../src/model/apiError';
import {fetchUserUpdate} from '../../src/util/fetchUserUpdate';


describe('fetchUserUpdate', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('success user1', async () => {
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user1.email, successUser1Data);
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user2.email, successUser2Data);

        return fetchUserUpdate(user1, token)
            .then((data: IApiUser) => {
                expect(data).toEqual(user1);
            });
    });

    it('success user2', async () => {
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user1.email, successUser1Data);
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user2.email, successUser2Data);

        return fetchUserUpdate(user2, token)
            .then((data: IApiUser) => {
                expect(data).toEqual(user2);
            });
    });

    it('fail400', async () => {
        fetchMock.putOnce('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user1.email, fail400);

        return fetchUserUpdate(user1, token)
            .catch((data: ApiError) => {
                expect(data).toBeInstanceOf(ApiError);
                expect(data.getCode()).toBe(400);
            });
    });
});

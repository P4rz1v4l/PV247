import * as fetchMock from 'fetch-mock';
import {authToken, email1} from '../testData';
import {fail400, successAuth} from '../mockData';
import {IApiUser} from '../../src/util/apiInterfaces';
import {ApiError} from '../../src/model/apiError';
import {fetchUserLogin} from '../../src/util/fetchUserLogin';


describe('fetchUserLogin', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('success', async () => {
        fetchMock.postOnce('https://pv247messaging.azurewebsites.net/api/v2/auth', successAuth);

        return fetchUserLogin(email1)
            .then((data: IApiUser) => {
                expect(data).toEqual(authToken);
            });
    });

    it('fail', async () => {
        fetchMock.postOnce('https://pv247messaging.azurewebsites.net/api/v2/auth', fail400);

        return fetchUserLogin(email1)
            .catch((data: ApiError) => {
                expect(data).toBeInstanceOf(ApiError);
                expect(data.getCode()).toBe(400);
            });
    });
});

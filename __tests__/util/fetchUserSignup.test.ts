import * as fetchMock from 'fetch-mock';
import { MyAppId } from '../../src/constants/myAppId';
import {newUser} from '../testData';
import {fail400, successNewUserData} from '../mockData';
import {IApiUser} from '../../src/util/apiInterfaces';
import {ApiError} from '../../src/model/apiError';
import {fetchUserSignup} from '../../src/util/fetchUserSignup';


describe('fetchUserSignup', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('success', async () => {
        fetchMock.postOnce('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user', successNewUserData);

        return fetchUserSignup(newUser.email)
            .then((data: IApiUser) => {
                expect(data).toEqual(newUser);
            });
    });

    it('fail', async () => {
        fetchMock.postOnce('https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user', fail400);

        return fetchUserSignup(newUser.email)
            .catch((data: ApiError) => {
                expect(data).toBeInstanceOf(ApiError);
                expect(data.getCode()).toBe(400);
            });
    });
});

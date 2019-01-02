import { MyAppId } from '../constants/myAppId';
import { validateResponse } from './validateResponse';
import memoize = require('memoizee');

export const fetchUserInfo = (email: string, token: string) => fetch(
    'https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + email,
    {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    })
    .then((response) => validateResponse(response));


export const memoizeFetchUserInfo = memoize(fetchUserInfo, { promise: true, maxAge: 300000 });

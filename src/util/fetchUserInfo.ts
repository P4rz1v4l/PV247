import { MyAppId } from '../constants/myAppId';
import { validateResponse } from './validateResponse';
import memoize = require('memoizee');

const fetchUserInfo = (email: string) => fetch(
    'https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + email,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    })
    .then((response) => validateResponse(response));





export const getUserInfo = memoize(fetchUserInfo);

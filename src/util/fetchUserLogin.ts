import {validateResponse} from './validateResponse';
import {MyAppId} from '../constants/myAppId';

export const fetchUserLogin = (email: string) => fetch(
    'https://pv247messaging.azurewebsites.net/api/v2/auth',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            email
        })
    })
    .then((response) => validateResponse(response));


export const fetchLoginUserInfo = (email: string, token: string) => fetch(
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

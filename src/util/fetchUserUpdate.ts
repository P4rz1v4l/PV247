import {MyAppId} from '../constants/myAppId';
import {validateResponse} from './validateResponse';
import {IApiUser} from './apiInterfaces';

export const fetchUserUpdate = (user: IApiUser, token: string) => fetch(
    'https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user/' + user.email,
    {
        method: 'PUT',
        headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({customData: user.customData})
    })
    .then((response) => validateResponse(response));

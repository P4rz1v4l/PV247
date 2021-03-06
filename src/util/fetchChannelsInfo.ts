import {MyAppId} from '../constants/myAppId';
import {validateResponse} from './validateResponse';

export const fetchChannelsInfo = (token: string) => fetch(
    'https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel',
    {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then((response) => validateResponse(response));

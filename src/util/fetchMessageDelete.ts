import {MyAppId} from '../constants/myAppId';
import {validateResponse} from './validateResponse';

export const fetchMessageDelete = (messageId: string, channelId: string | null, token: string) => fetch(
    'https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channelId + '/message/' + messageId,
    {
        method: 'DELETE',
        headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then((response) => validateResponse(response));

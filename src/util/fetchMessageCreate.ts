import {MyAppId} from '../constants/myAppId';
import {validateResponse} from './validateResponse';

export const fetchMessageCreate = (value: string, channelId: string | null, token: string) => fetch(
    'https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channelId + '/message',
    {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            value,
            customData: {
                likes: [],
                dislikes: [],
                attachments: [],
                timestamp: new Date().getTime(),
            }
        }),
    })
    .then((response) => validateResponse(response));

import {MyAppId} from '../constants/myAppId';
import {validateResponse} from './validateResponse';
import {IChannel} from '../model/stateChannels';

export const fetchChannelUpdate = (channel: IChannel, token: string) => fetch(
    'https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channel.id,
    {
        method: 'PUT',
        headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            ...channel,
            customData: {
                ...channel.customData,
                timestamp: new Date().getTime().toString(),
            },
        }),
    })
    .then((response) => validateResponse(response));

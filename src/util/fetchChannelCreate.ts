import {MyAppId} from '../constants/myAppId';
import {validateResponse} from './validateResponse';
import {IChannelCustomData} from '../model/stateChannels';

export const fetchChannelCreate = (name: string, customData: IChannelCustomData, token: string) => fetch(
    'https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel',
    {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            name ,
            customData,
        })
    })
    .then((response) => validateResponse(response));

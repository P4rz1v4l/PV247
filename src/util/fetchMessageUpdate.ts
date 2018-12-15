import {MyAppId} from '../constants/myAppId';
import {validateResponse} from './validateResponse';
import {IMessageCustomData} from '../model/stateMessages';

export interface IApiMessage {
    value: string;
    customData: IMessageCustomData;
}

export const fetchMessageUpdate = (messageData: IApiMessage, messageId: string, channelId: string | null, token: string) => fetch(
    'https://pv247messaging.azurewebsites.net/api/v2/app/' + MyAppId + '/channel/' + channelId + '/message/' + messageId,
    {
        method: 'PUT',
        headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({...messageData, customData: {...messageData.customData, timestamp: new Date().getTime()}}),
    })
    .then((response) => validateResponse(response));

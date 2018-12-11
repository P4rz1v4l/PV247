import {MyAppId} from '../constants/myAppId';
import {validateResponse} from './validateResponse';

export const fetchUserSignup = (email: string) => fetch(
    'https://pv247messaging.azurewebsites.net/api/v2/' + MyAppId + '/user',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            email,
            customData: {
                nick: email,
                avatar: '',
                channelsOrder: []
            }
        })
    })
    .then((response) => validateResponse(response));

import {validateResponse} from './validateResponse';

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

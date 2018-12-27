import {validateResponse} from './validateResponse';

export const uploadFile = (data: FormData, token: string) => fetch(
    'https://pv247messaging.azurewebsites.net/api/v2/file',
    {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
        },
        body: data
    })
    .then((response) => validateResponse(response));


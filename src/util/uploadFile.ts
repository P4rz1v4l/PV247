import {validateResponse} from './validateResponse';

export const uploadFile = (file: File, token: string) => {
    const formData = new FormData();
    formData.append('Files', file);

    return fetch(
        'https://pv247messaging.azurewebsites.net/api/v2/file',
        {
            method: 'POST',
            headers: {
                Authorization: 'bearer ' + token,
                Accept: 'application/json',
            },
            body: formData
        })
        .then((response) => validateResponse(response));
};

export const getDownloadLink = (id: string, token: string) => fetch(
    'https://pv247messaging.azurewebsites.net/api/v2/file/' + id + '/download-link',
    {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + token,
            Accept: 'application/json',
        }
    })
    .then((response) => validateResponse(response));

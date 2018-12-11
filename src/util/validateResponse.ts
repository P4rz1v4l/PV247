import {ApiError} from '../model/apiError';

export const validateResponse = ( response: Response ) => {
    if ( response.status >= 200 && response.status < 300 ) {
        return response.json();
    }
    else {
        throw new ApiError(response.status, response.statusText, response.text());
    }
};

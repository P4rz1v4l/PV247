import {
    CHANNELS_FETCH_SUCCESS,
} from '../constants/channelsActionsTypes';
import { Dispatch } from 'redux';
import { AppId } from '../constants/appId';
import { loadingChannels } from './appActionCreator';



export const channelsFetchSuccess = (data: Array<{id: string; name: string; customData: any}>): any => ({
    type: CHANNELS_FETCH_SUCCESS,
    payload: {
        channels: data
    }
});

export function fetchChannels(): any {
    return (dispatch: Dispatch ) => {
        dispatch(loadingChannels(true));

        fetch(
            'https://pv247messaging.azurewebsites.net/api/v2/app/' + AppId + '/channel',
            {
                method: 'GET',
                headers: {
                    Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsdWsua3JpemFuQGdtYWlsLmNvbSIsImp0aSI6Ijk4NDBlNmE0LTk2MGUtNDFkMy04YjdjLTdlOThmZTE2MjY4MCIsImlhdCI6MTU0Mzc3ODQwMSwibmJmIjoxNTQzNzc4NDAxLCJleHAiOjE1NDM4NjQ4MDEsImlzcyI6IlBWMjQ3IEFQSSIsImF1ZCI6IlBWMjQ3IFN0dWRlbnRzIn0.fIUx7wciTmQ_jNUaYPJ9LTa9t4VrWvfLKWp81BiZBxE`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(channelsFetchSuccess(data));
                dispatch(loadingChannels(false));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

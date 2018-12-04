import { List, Map } from 'immutable';
import {
    CHANNELS_FETCH_SUCCESS,
} from '../constants/channelsActionsTypes';

export const channels = (prevState = {} as any, action: any) => {
    switch (action.type) {
        case CHANNELS_FETCH_SUCCESS: {
            const channelsArray: Array<Map<string, any>> = [];

            action.payload.channels.forEach((item: {id: string; name: string; customData: any}) => {
                channelsArray.push(Map(item));
            });

            return List(channelsArray);
        }

        default:
            return prevState;
    }
};

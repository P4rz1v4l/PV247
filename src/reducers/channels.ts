import { Map } from 'immutable';
import {IChannel, ChannelRecord, IStateChannels} from '../model/stateChannels';
import {
    CHANNELS_CREATE_SUCCESS,
    CHANNELS_FETCH_SUCCESS,
} from '../constants/channelsActionsTypes';

export const channels = (prevState = Map({}) as IStateChannels, action: any): IStateChannels => {
    switch (action.type) {
        case CHANNELS_FETCH_SUCCESS: {
            const channelsMap: any = {};

            action.payload.channels.forEach((item: IChannel) => {
                channelsMap[item.id] = new ChannelRecord(item);
            });

            return Map(channelsMap);
        }

        case CHANNELS_CREATE_SUCCESS: {
            return prevState.set(action.payload.channel.id, new ChannelRecord(action.payload.channel));
        }

        default:
            return prevState;
    }
};

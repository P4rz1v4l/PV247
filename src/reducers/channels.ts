import {Map, Set} from 'immutable';
import {IChannel, ChannelRecord, StateChannels} from '../model/stateChannels';
import {
    CHANNEL_CREATE_SUCCESS,
    CHANNEL_UPDATE_SUCCESS,
    CHANNELS_FETCH_SUCCESS,
    CHANNELS_UPDATE_SUCCESS,
} from '../constants/channelsActionsTypes';
import {STATE_DATA_CLEAR} from '../constants/appActionsTypes';

export const channels = (prevState = Map() as StateChannels, action: any): StateChannels => {
    switch (action.type) {
        case CHANNELS_FETCH_SUCCESS: {
            const channelsMap: any = {};

            action.payload.channels.forEach((item: IChannel) => {
                channelsMap[item.id] = new ChannelRecord(item);
            });

            return Map(channelsMap);
        }

        case CHANNELS_UPDATE_SUCCESS: {
            let channelMap: StateChannels = prevState;
            const arrayNewIds: string[] = [];

            action.payload.channels.forEach((channel: IChannel) => {
                // @ts-ignore
                if (!channelMap.has(channel.id) || channelMap.get(channel.id).customData.timestamp !== channel.customData.timestamp) {
                    channelMap = channelMap.set(channel.id, new ChannelRecord(channel));
                }

                arrayNewIds.push(channel.id);
            });

            Set(prevState.keys()).subtract(arrayNewIds).forEach((id: string) => {
                channelMap = channelMap.delete(id);
            });

            return channelMap;
        }

        case CHANNEL_CREATE_SUCCESS: {
            return prevState.set(action.payload.channel.id, new ChannelRecord(action.payload.channel));
        }

        case CHANNEL_UPDATE_SUCCESS: {
            return prevState.set(action.payload.channel.id, new ChannelRecord(action.payload.channel));
        }

        case STATE_DATA_CLEAR: {
            return Map();
        }

        default:
            return prevState;
    }
};

import {Map} from 'immutable';
import {channels} from '../../src/reducers/channels';
import {CHANNEL_CREATE_SUCCESS, CHANNEL_UPDATE_SUCCESS, CHANNELS_FETCH_SUCCESS, CHANNELS_UPDATE_SUCCESS} from '../../src/constants/channelsActionsTypes';
import {bothChannelsMap, channel1, channel1Map, channel1UpdatedMap, channel2Map, channel1Updated, bothChannelsUpdatedMap, channel2} from '../testData';

describe('channels', () => {
    it('init', () => {
        expect(channels(undefined, {})).toEqual(Map());
    });

    it('CHANNELS_FETCH_SUCCESS', () => {
        expect(channels(Map(), {type: CHANNELS_FETCH_SUCCESS, payload: {channels: [channel1, channel2]}})).toEqual(bothChannelsMap);
    });

    it('CHANNELS_UPDATE_SUCCESS', () => {
        expect(channels(Map(), {type: CHANNELS_UPDATE_SUCCESS, payload: {channels: [channel1]}})).toEqual(channel1Map);
        expect(channels(bothChannelsMap, {type: CHANNELS_UPDATE_SUCCESS, payload: {channels: [channel1Updated, channel2]}})).toEqual(bothChannelsUpdatedMap);
    });

    it('CHANNEL_CREATE_SUCCESS', () => {
        expect(channels(Map(), {type: CHANNEL_CREATE_SUCCESS, payload: {channel: channel1}})).toEqual(channel1Map);
        expect(channels(channel2Map, {type: CHANNEL_CREATE_SUCCESS, payload: {channel: channel1}})).toEqual(bothChannelsMap);
    });

    it('CHANNEL_UPDATE_SUCCESS', () => {
        expect(channels(channel1Map, {type: CHANNEL_UPDATE_SUCCESS, payload: {channel: channel1Updated}})).toEqual(channel1UpdatedMap);
        expect(channels(bothChannelsMap, {type: CHANNEL_UPDATE_SUCCESS, payload: {channel: channel1Updated}})).toEqual(bothChannelsUpdatedMap);
    });
});

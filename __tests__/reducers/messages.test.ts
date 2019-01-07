import {messages} from '../../src/reducers/messages';
import {OrderedMap} from 'immutable';
import {MESSAGE_UPDATE_SUCCESS, MESSAGES_LOAD_SUCCESS, MESSAGES_UPDATE_SUCCESS} from '../../src/constants/messagesActionsTypes';
import {message1, message1Map, message1Updated, message2, messagesMap, messagesUpdatedMap} from '../testData';

describe('messages', () => {
    it('init', () => {
        expect(messages(undefined, {})).toEqual(OrderedMap());
    });

    it('MESSAGES_LOAD_SUCCESS', () => {
        expect(messages(OrderedMap(), {type: MESSAGES_LOAD_SUCCESS, payload: {messages: [message2, message1]}})).toEqual(messagesMap);
    });

    it('MESSAGE_UPDATE_SUCCESS', () => {
        expect(messages(messagesMap, {type: MESSAGE_UPDATE_SUCCESS, payload: {message: message1Updated}})).toEqual(messagesUpdatedMap);
    });

    it('MESSAGES_UPDATE_SUCCESS', () => {
        expect(messages(OrderedMap(), {type: MESSAGES_UPDATE_SUCCESS, payload: {messages: []}})).toEqual(OrderedMap());
        expect(messages(OrderedMap(), {type: MESSAGES_UPDATE_SUCCESS, payload: {messages: [message2, message1]}})).toEqual(messagesMap);
        expect(messages(message1Map, {type: MESSAGES_UPDATE_SUCCESS, payload: {messages: [message2, message1]}})).toEqual(messagesMap);
        expect(messages(messagesMap, {type: MESSAGES_UPDATE_SUCCESS, payload: {messages: [message1]}})).toEqual(message1Map);
        expect(messages(messagesMap, {type: MESSAGES_UPDATE_SUCCESS, payload: {messages: [message2, message1]}})).toEqual(messagesMap);
        expect(messages(messagesMap, {type: MESSAGES_UPDATE_SUCCESS, payload: {messages: [message2, message1Updated]}})).toEqual(messagesUpdatedMap);
    });

});

import {
    LOAD_MESSAGES_SUCCESS, UPDATE_LOADED_MESSAGES_SUCCESS,
    UPDATE_MESSAGE_SUCCESS,
} from '../constants/messagesActionsTypes';
import {IMessage, IStateMessages, MessageRecord} from '../model/stateMessages';
import {OrderedMap} from 'immutable';

export const messages = (prevState = OrderedMap({}) as IStateMessages, action: any) => {
    switch (action.type) {
        case LOAD_MESSAGES_SUCCESS: {
            let messagesMap: IStateMessages = OrderedMap({});

            action.payload.messages.reverse().forEach((message: IMessage) => {
                messagesMap = messagesMap.set(message.id, new MessageRecord(message));
            });

            return messagesMap;
        }

        case UPDATE_MESSAGE_SUCCESS: {
            return prevState.set(action.payload.message.id, new MessageRecord(action.payload.message));
        }

        case UPDATE_LOADED_MESSAGES_SUCCESS: {
            let messagesMap: IStateMessages = prevState;

            action.payload.messages.reverse().forEach((message: IMessage) => {
                // @ts-ignore
                if (!messagesMap.has(message.id) || messagesMap.get(message.id).customData.timestamp !== message.customData.timestamp) {
                    messagesMap = messagesMap.set(message.id, new MessageRecord(message));
                }
            });

            return messagesMap;
        }

        default:
            return prevState;
    }
};

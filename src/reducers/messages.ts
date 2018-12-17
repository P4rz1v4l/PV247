import {
    MESSAGES_LOAD_SUCCESS, MESSAGES_UPDATE_SUCCESS,
    MESSAGE_UPDATE_SUCCESS,
} from '../constants/messagesActionsTypes';
import {IMessage, IStateMessages, MessageRecord} from '../model/stateMessages';
import {OrderedMap, Set} from 'immutable';

export const messages = (prevState = OrderedMap({}) as IStateMessages, action: any) => {
    switch (action.type) {
        case MESSAGES_LOAD_SUCCESS: {
            let messagesMap: IStateMessages = OrderedMap({});

            action.payload.messages.reverse().forEach((message: IMessage) => {
                messagesMap = messagesMap.set(message.id, new MessageRecord(message));
            });

            return messagesMap;
        }

        case MESSAGE_UPDATE_SUCCESS: {
            return prevState.set(action.payload.message.id, new MessageRecord(action.payload.message));
        }

        case MESSAGES_UPDATE_SUCCESS: {
            // let messagesMap: IStateMessages = OrderedMap({});
            let messagesMap: IStateMessages = prevState;
            const arrayNewIds: string[] = [];

            action.payload.messages.reverse().forEach((message: IMessage) => {
                // @ts-ignore
                if (!messagesMap.has(message.id) || messagesMap.get(message.id).customData.timestamp !== message.customData.timestamp) {
                    messagesMap = messagesMap.set(message.id, new MessageRecord(message));
                }

                arrayNewIds.push(message.id);
            });

            Set(prevState.keys()).subtract(arrayNewIds).forEach((id: string) => {
                messagesMap = messagesMap.delete(id);
            });

            return messagesMap;
        }

        default:
            return prevState;
    }
};

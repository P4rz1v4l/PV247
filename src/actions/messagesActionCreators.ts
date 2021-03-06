import {
    MESSAGE_UPDATE_SUCCESS,
    MESSAGES_LOAD_SUCCESS,
    MESSAGES_UPDATE_SUCCESS,
} from '../constants/messagesActionsTypes';
import {IMessage, IMessageCustomDataAttachments} from '../model/stateMessages';
import {Dispatch} from 'redux';
import {IState} from '../model/state';
import {ApiError} from '../model/apiError';
import {sendingMessage, updatingMessage} from './appActionCreator';
import {fetchMessageCreate} from '../util/fetchMessageCreate';
import {fetchMessageDelete} from '../util/fetchMessageDelete';
import {fetchMessageUpdate} from '../util/fetchMessageUpdate';
import {IApiMessage} from '../util/apiInterfaces';
import {fetchMessagesInfo} from '../util/fetchMessagesInfo';
import {errorAdd} from './errorsActionCreators';


export const loadMessagesSuccess = (messages: IMessage[]): any => ({
    type: MESSAGES_LOAD_SUCCESS,
    payload: {
        messages
    }
});

export const updateLoadedMessagesSuccess = (messages: IMessage[]): any => ({
    type: MESSAGES_UPDATE_SUCCESS,
    payload: {
        messages
    }
});

export const updateLoadedMessages = (): any => {
    return (dispatch: Dispatch, getState: () => IState) => {
        if (getState().app.actualChannelId !== null && getState().app.actualChannelId !== '') {
            return fetchMessagesInfo(getState().app.actualChannelId, getState().user.token)
                .then((messages: IMessage[]) => {
                    dispatch(updateLoadedMessagesSuccess(messages));
                })
                .catch((errorSignup: ApiError) => {
                    console.log(errorSignup);
                });
        }

        return null;
    };
};

export const sendMessage = (value: string, attachments: IMessageCustomDataAttachments[]): any => {
    return (dispatch: Dispatch, getState: () => IState) => {
        dispatch(sendingMessage(true));

        return fetchMessageCreate(value, attachments, getState().app.actualChannelId, getState().user.token)
            .then(() => {
                dispatch(sendingMessage(false));
            })
            .catch(() => {
                dispatch(errorAdd('Error: Send Message'));
                dispatch(sendingMessage(false));
            });
    };
};


export const deleteMessage = (messageId: string): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {

        return fetchMessageDelete(messageId, getState().app.actualChannelId, getState().user.token)
            .catch((error: ApiError) => {
                if ('code' in error) {
                    dispatch(errorAdd('Error: Delete Message'));
                }
            });
    };
};

export const updateMessageSuccess = (message: IMessage): any => ({
    type: MESSAGE_UPDATE_SUCCESS,
    payload: {
        message
    }
});

export const updateMessage = (newMessageData: IApiMessage, messageId: string): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        dispatch(updatingMessage(true));

        return fetchMessageUpdate(newMessageData, messageId, getState().app.actualChannelId, getState().user.token)
            .then((message: IMessage) => {
                dispatch(updateMessageSuccess(message));
                dispatch(updatingMessage(false));
            })
            .catch(() => {
                dispatch(errorAdd('Error: Update Message'));
                dispatch(updatingMessage(false));
            });
    };
};

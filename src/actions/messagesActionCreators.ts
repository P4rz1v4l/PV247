import {
    UPDATE_MESSAGE_SUCCESS,
    LOAD_MESSAGES_SUCCESS,
    UPDATE_LOADED_MESSAGES_SUCCESS,
} from '../constants/messagesActionsTypes';
import {IMessage} from '../model/stateMessages';
import {Dispatch} from 'redux';
import {IState} from '../model/state';
import {ApiError} from '../model/apiError';
import {sendingMessage, updatingMessage} from './appActionCreator';
import {fetchMessageCreate} from '../util/fetchMessageCreate';
import {fetchMessageDelete} from '../util/fetchMessageDelete';
import {fetchMessageUpdate, IApiMessage} from '../util/fetchMessageUpdate';
import {fetchMessagesInfo} from '../util/fetchMessagesInfo';


export const loadMessagesSuccess = (messages: IMessage[]): any => ({
    type: LOAD_MESSAGES_SUCCESS,
    payload: {
        messages
    }
});

export const updateLoadedMessagesSuccess = (messages: IMessage[]): any => ({
    type: UPDATE_LOADED_MESSAGES_SUCCESS,
    payload: {
        messages
    }
});

export const updateLoadedMessages = (): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        fetchMessagesInfo(getState().app.actualChannelId, getState().user.token)
            .then((messages: IMessage[]) => {
                dispatch(updateLoadedMessagesSuccess(messages));
            })
            .catch((errorSignup: ApiError) => {
                console.log(errorSignup);
            });
    };
};

export const sendMessage = (value: string): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        dispatch(sendingMessage(true));

        fetchMessageCreate(value, getState().app.actualChannelId, getState().user.token)
            .then(() => {
                dispatch(sendingMessage(false));
            })
            .catch((errorSignup: ApiError) => {
                console.log(errorSignup);
                dispatch(sendingMessage(false));
            });
    };
};

export const deleteMessage = (messageId: string): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {

        fetchMessageDelete(messageId, getState().app.actualChannelId, getState().user.token)
            .catch((errorSignup: ApiError) => {
                console.log(errorSignup);
                dispatch(updatingMessage(false));
            });
    };
};

export const updateMessageSuccess = (message: IMessage): any => ({
    type: UPDATE_MESSAGE_SUCCESS,
    payload: {
        message
    }
});

export const updateMessage = (newMessageData: IApiMessage, messageId: string): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        dispatch(updatingMessage(true));

        fetchMessageUpdate(newMessageData, messageId, getState().app.actualChannelId, getState().user.token)
            .then((message: IMessage) => {
                dispatch(updateMessageSuccess(message));
                dispatch(updatingMessage(false));
            })
            .catch((errorSignup: ApiError) => {
                console.log(errorSignup);
                dispatch(updatingMessage(false));
            });
    };
};

import { v4 as uuid } from 'uuid';
import {
    SEND_MESSAGE,
    DELETE_MESSAGE,
    LIKE_MESSAGE,
    DISLIKE_MESSAGE,
    EDIT_MESSAGE,
} from '../constants/actionsTypes';

export const sendMessage = (author: string, text: string): any => ({
    type: SEND_MESSAGE,
    payload: {
        text,
        author,
        id: uuid(),
    }
});

export const deleteMessage = (id: string): any => ({
    type: DELETE_MESSAGE,
    payload: {
        id
    }
});

export const editMessage = (id: string, text: string): any => ({
    type: EDIT_MESSAGE,
    payload: {
        id,
        text
    }
});

export const likeMessage = (id: string): any => ({
    type: LIKE_MESSAGE,
    payload: {
        id
    }
});

export const dislikeMessage = (id: string): any => ({
    type: DISLIKE_MESSAGE,
    payload: {
        id
    }
});

import * as uuid from 'uuid';
import {
  SEND_MESSAGE,
  DELETE_MESSAGE,
  LIKE_MESSAGE,
  DISLIKE_MESSAGE,
  EDIT_MESSAGE
} from '../constants/actionsTypes';

export const sendMessage = (author, text) => ({
  type: SEND_MESSAGE,
  payload: {
    text,
    author,
    id: uuid(),
  }
});

export const deleteMessage = (id) => ({
  type: DELETE_MESSAGE,
  payload: {
    id
  }
});

export const editMessage = (id, text) => ({
  type: EDIT_MESSAGE,
  payload: {
    id,
    text
  }
});

export const likeMessage = (id) => ({
  type: LIKE_MESSAGE,
  payload: {
    id
  }
});

export const dislikeMessage = (id) => ({
  type: DISLIKE_MESSAGE,
  payload: {
    id
  }
});

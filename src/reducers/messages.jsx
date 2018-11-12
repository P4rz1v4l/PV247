import { Map } from 'immutable';
import {
  SEND_MESSAGE,
  DELETE_MESSAGE,
  LIKE_MESSAGE,
  DISLIKE_MESSAGE,
  EDIT_MESSAGE
} from '../constants/actionsTypes';

export const messages = (prevState = {}, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      const { id, text, author } = action.payload;

      return prevState.push(Map({
        id,
        text,
        author,
        likes: 0
      }));
    }

    case DELETE_MESSAGE: {
      return prevState.filter((item) => item.id !== action.payload.id).toList();
    }

    case EDIT_MESSAGE: {
      const index = prevState.findIndex((item) => item.id === action.payload.id);
      const oldMessage = prevState.get(index);

      return prevState.set(index, {...oldMessage, text: action.payload.text});
    }

    case LIKE_MESSAGE: {
      const index = prevState.findIndex((item) => item.id === action.payload.id);
      const oldMessage = prevState[index];
      const newMessage = {...oldMessage, likes: oldMessage.likes + 1};

      const newState = prevState.slice(0);
      newState[index] = newMessage;

      return newState;
    }

    case DISLIKE_MESSAGE: {
      const index = prevState.findIndex((item) => item.id === action.payload.id);
      const oldMessage = prevState[index];
      const newMessage = {...oldMessage, likes: oldMessage.likes - 1};

      const newState = prevState.slice(0);
      newState[index] = newMessage;

      return newState;
    }

    default:
      return prevState;
  }
};

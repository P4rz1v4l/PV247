import { Map, List} from 'immutable';
import {
  SEND_MESSAGE,
  DELETE_MESSAGE,
  LIKE_MESSAGE,
  DISLIKE_MESSAGE,
  EDIT_MESSAGE
} from '../constants/actionsTypes';

export const messages = (prevState = List(), action) => {
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
      const oldMessage = prevState.get(index);

      return prevState.set(index, {...oldMessage, likes: oldMessage.likes + 1});
    }

    case DISLIKE_MESSAGE: {
      const index = prevState.findIndex((item) => item.id === action.payload.id);
      const oldMessage = prevState.get(index);

      return prevState.set(index, {...oldMessage, likes: oldMessage.likes - 1});
    }

    default:
      return prevState;
  }
};

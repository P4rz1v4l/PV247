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
        id, text, author, likes: 0
      }));
    }

    case DELETE_MESSAGE: {
      return prevState.filter((item) => item.get('id') !== action.payload.id);
    }

    case EDIT_MESSAGE: {
      const index = prevState.findIndex((item) => item.get('id') === action.payload.id);

      return prevState.setIn([index, 'text'], action.payload.text);
    }

    case LIKE_MESSAGE: {
      const index = prevState.findIndex((item) => item.get('id') === action.payload.id);

      return prevState.updateIn([index, 'likes'], val => val + 1);
    }

    case DISLIKE_MESSAGE: {
      const index = prevState.findIndex((item) => item.get('id') === action.payload.id);

      return prevState.updateIn([index, 'likes'], val => val - 1);
    }

    default:
      return prevState;
  }
};

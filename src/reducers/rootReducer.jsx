import { Map } from 'immutable';
import { messages } from './messages';

export const rootReducer = (prevState = {}, action) => (Map({
  app: prevState.get('app'),
  user: prevState.get('user'),
  channels: prevState.get('channels'),
  messages: messages(prevState.get('messages'), action)
}));

import { messages } from './messages';

export const rootReducer = (prevState = {}, action) => ({
  app: prevState.app,
  user: prevState.user,
  channels: prevState.channels,
  messages: messages(prevState.messages, action)
});

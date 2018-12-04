import { Map } from 'immutable';
import { messages } from './messages';
import { channels } from './channels';
import { app } from './app';

export const rootReducer = (prevState = {} as any, action: any) => (Map({
    app: app(prevState.get('app'), action),
    user: prevState.get('user'),
    channels: channels(prevState.get('channels'), action),
    messages: messages(prevState.get('messages'), action)
}));

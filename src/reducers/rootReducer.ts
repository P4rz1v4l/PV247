import { Map } from 'immutable';
import { messages } from './messages';
import { channels } from './channels';
import { user } from './user';
import { app } from './app';

export const rootReducer = (prevState: any, action: any) => (Map({
    app: app(prevState.get('app'), action),
    user: user(prevState.get('user'), action),
    channels: channels(prevState.get('channels'), action),
    messages: messages(prevState.get('messages'), action)
}));

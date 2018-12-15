import {messages} from './messages';
import {channels} from './channels';
import {user} from './user';
import {app} from './app';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({app, user, channels, messages});

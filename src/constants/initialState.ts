// ToDo: Map to Record
import { Map, OrderedMap } from 'immutable';
import { StateAppRecord } from '../model/stateApp';
import {StateUserRecord} from '../model/stateUser';

export const initialState = {
    app: new StateAppRecord(),
    user: new StateUserRecord(),
    channels: Map({}),
    messages: OrderedMap({}),
};

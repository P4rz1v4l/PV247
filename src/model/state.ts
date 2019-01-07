import {Map, OrderedMap, Record} from 'immutable';
import {StateAppRecord} from './stateApp';
import {StateUserRecord} from './stateUser';
import {StateChannels} from './stateChannels';
import {StateMessages} from './stateMessages';
import {StateError} from './stateErrors';

export interface IState {
    app: StateAppRecord;
    user: StateUserRecord;
    channels: StateChannels;
    messages: StateMessages;
    errors: StateError;
}

export const defaultState: IState = {
    app: new StateAppRecord(),
    user: new StateUserRecord(),
    channels: Map({}),
    messages: OrderedMap({}),
    errors: Map({}),
};

export class StateRecord extends Record(defaultState) implements IState {
    public app!: StateAppRecord;
    public user!: StateUserRecord;
    public channels!: StateChannels;
    public messages!: StateMessages;
    public errors!: StateError;

    public constructor(values?: Partial<IState>) {
        values ? super(values) : super();
    }
}

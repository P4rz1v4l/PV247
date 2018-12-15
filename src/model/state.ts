import {Map, OrderedMap, Record} from 'immutable';
import {StateAppRecord} from './stateApp';
import {StateUserRecord} from './stateUser';
import {IStateChannels} from './stateChannels';
import {IStateMessages} from './stateMessages';

export interface IState {
    app: StateAppRecord;
    user: StateUserRecord;
    channels: IStateChannels;
    messages: IStateMessages;
}

const defaultState: IState = {
    app: new StateAppRecord(),
    user: new StateUserRecord(),
    channels: Map({}),
    messages: OrderedMap({}),
};

export class StateRecord extends Record(defaultState) implements IState {
    public app!: StateAppRecord;
    public user!: StateUserRecord;
    public channels!: IStateChannels;
    public messages!: IStateMessages;

    public constructor(values?: Partial<IState>) {
        values ? super(values) : super();
    }
}

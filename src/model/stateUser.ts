import { Record } from 'immutable';

interface IStateUser {
    isLogged: boolean;
    email: string;
    nick: string;
    avatar: string;
    channelsOrder: string[];
    token: string;
}

const defaultStateUser: IStateUser = {
    isLogged: false,
    email: '',
    nick: '',
    avatar: '',
    channelsOrder: [],
    token: '',
};

export class StateUserRecord extends Record(defaultStateUser) implements IStateUser {
    public isLogged!: boolean;
    public email!: string;
    public nick!: string;
    public avatar!: string;
    public channelsOrder!: string[];
    public token!: string;

    public constructor(values?: Partial<IStateUser>) {
        values ? super(values) : super();
    }
}

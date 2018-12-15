import { Record } from 'immutable';

interface IStateApp {
    actualChannelId: string | null;
    channelLoading: boolean;
    channelCreating: boolean;
    userLoginProcess: boolean;
    inCreateChannel: boolean;
    userChangingName: boolean;
    messagesLoading: boolean;
    messageSending: boolean;
    messageUpdating: boolean;
}

const defaultStateApp: IStateApp = {
    actualChannelId: null,
    channelLoading: false,
    channelCreating: false,
    userLoginProcess: false,
    inCreateChannel: true,
    userChangingName: false,
    messagesLoading: false,
    messageSending: false,
    messageUpdating: false,
};

export class StateAppRecord extends Record(defaultStateApp) implements IStateApp {
    public actualChannelId: string | null;
    public channelLoading!: boolean;
    public channelCreating!: boolean;
    public userLoginProcess!: boolean;
    public inCreateChannel!: boolean;
    public userChangingName!: boolean;
    public messagesLoading!: boolean;
    public messageSending!: boolean;
    public messageUpdating!: boolean;

    public constructor(values?: Partial<IStateApp>) {
        values ? super(values) : super();
    }
}

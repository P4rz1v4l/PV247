import { Record } from 'immutable';

interface IStateApp {
    actualChannelId: string | null;
    channelLoading: boolean;
    channelCreating: boolean;
    channelUpdating: boolean;
    userLoginProcess: boolean;
    inCreateChannel: boolean;
    userChangingName: boolean;
    userChangingAvatar: boolean;
    messagesLoading: boolean;
    messageSending: boolean;
    messageUpdating: boolean;
}

const defaultStateApp: IStateApp = {
    actualChannelId: null,
    channelLoading: false,
    channelCreating: false,
    channelUpdating: false,
    userLoginProcess: false,
    inCreateChannel: true,
    userChangingName: false,
    userChangingAvatar: false,
    messagesLoading: false,
    messageSending: false,
    messageUpdating: false,
};

export class StateAppRecord extends Record(defaultStateApp) implements IStateApp {
    public actualChannelId: string | null;
    public channelLoading!: boolean;
    public channelCreating!: boolean;
    public channelUpdating!: boolean;
    public userLoginProcess!: boolean;
    public inCreateChannel!: boolean;
    public userChangingName!: boolean;
    public userChangingAvatar!: boolean;
    public messagesLoading!: boolean;
    public messageSending!: boolean;
    public messageUpdating!: boolean;

    public constructor(values?: Partial<IStateApp>) {
        values ? super(values) : super();
    }
}

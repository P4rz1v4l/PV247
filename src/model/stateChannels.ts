import { Record, Map } from 'immutable';

export interface IChannelCustomData {
    owner: string;
    description: string;
    users: string[];
}

export interface IChannel {
    id: string;
    name: string;
    customData: IChannelCustomData;
}

const defaultChannel: IChannel = {
    id: '',
    name: '',
    customData: {
        owner: '',
        description: '',
        users: [],
    },
};

export class ChannelRecord extends Record(defaultChannel) implements IChannel {
    public id!: string;
    public name!: string;
    public customData!: { description: string; users: string[]; owner: string};

    public constructor(values?: Partial<IChannel>) {
        values ? super(values) : super();
    }
}

export type IStateChannels = Map<string, ChannelRecord>;

import { Record, OrderedMap } from 'immutable';

export interface IMessageCustomDataAttachments {
    name: string;
    link: string;
    ext: string;
}

export interface IMessageCustomData {
    likes: string[];
    dislikes: string[];
    attachments: IMessageCustomDataAttachments[];
    timestamp: string;
}

export interface IMessage {
    id: string;
    value: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    customData: IMessageCustomData;
}

const defaultMessage: IMessage = {
    id: '',
    value: '',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
    customData: {
        likes: [],
        dislikes: [],
        attachments: [],
        timestamp: ''
    }
};

export class MessageRecord extends Record(defaultMessage) implements IMessage {
    public id!: string;
    public value!: string;
    public createdAt!: string;
    public createdBy!: string;
    public updatedAt!: string;
    public updatedBy!: string;
    public customData: {
        likes: string[];
        dislikes: string[];
        attachments: IMessageCustomDataAttachments[];
        timestamp: string;
    };

    public constructor(values?: Partial<IMessage>) {
        values ? super(values) : super();
    }
}

export type StateMessages = OrderedMap<string, MessageRecord>;

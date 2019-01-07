import {IApiAuth, IApiMessage, IApiUser} from '../src/util/apiInterfaces';
import {IMessage, MessageRecord} from '../src/model/stateMessages';
import {ChannelRecord, IChannel} from '../src/model/stateChannels';
import {Map, OrderedMap} from 'immutable';
import {StateUserRecord} from '../src/model/stateUser';

export const token: string = 'token';
export const channelId: string = '001';
export const email1: string = 'test1@test.com';
export const email2: string = 'test2@test.com';

export const user1: IApiUser = {
    email: email1,
    customData: {
        nick: 'test1',
        avatar: '',
        channelsOrder: []
    }
};

export const user1Updated: IApiUser = {
    email: email1,
    customData: {
        nick: 'test1o',
        avatar: 'avatar',
        channelsOrder: []
    }
};

export const user2: IApiUser = {
    email: email2,
    customData: {
        nick: 'test2',
        avatar: 'http://test.com/avatar.png',
        channelsOrder: []
    }
};

export const newUser: IApiUser = {
    email: email1,
    customData: {
        nick: email1,
        avatar: '',
        channelsOrder: []
    }
};

export const authToken: IApiAuth = {
    token,
    expiration: '12:12:12, 12.12.1212'
};

export const newMessageWithoutAttachments: IApiMessage = {
    value: 'new message',
    customData: {
        likes: [],
        dislikes: [],
        attachments: [],
        timestamp: '12:12:12, 12.12.1212',
    }
};

export const newMessageWithoutAttachmentsResponse: IMessage = {
    id: '001',
    value: 'new message',
    createdAt: '12:12:12, 12.12.1212',
    createdBy: email1,
    updatedAt: '12:12:12, 12.12.1212',
    updatedBy: email1,
    customData: {
        likes: [],
        dislikes: [],
        attachments: [],
        timestamp: '12:12:12, 12.12.1212',
    }
};

export const newMessageWithAttachments: IApiMessage = {
    value: 'new message',
    customData: {
        likes: [],
        dislikes: [],
        attachments: [{name: 'file1.png', link: 'www.test.sk/file1.png', ext: '.png'}, {name: 'file2.png', link: 'www.test.sk/file2.png', ext: '.png'}, {name: 'file1.png', link: 'www.test.sk/file1_1.png', ext: '.png'}],
        timestamp: '12:12:12, 12.12.1212',
    }
};

export const newMessageWithAttachmentsResponse: IMessage = {
    id: '002',
    value: 'new message',
    createdAt: '12:12:12, 12.12.1212',
    createdBy: email1,
    updatedAt: '12:12:12, 12.12.1212',
    updatedBy: email1,
    customData: {
        likes: [],
        dislikes: [],
        attachments: [{name: 'file1.png', link: 'www.test.sk/file1.png', ext: '.png'}, {name: 'file2.png', link: 'www.test.sk/file2.png', ext: '.png'}, {name: 'file1.png', link: 'www.test.sk/file1_1.png', ext: '.png'}],
        timestamp: '12:12:12, 12.12.1212',
    }
};

export const message1: IMessage = {
    id: '00001',
    value: 'new message',
    createdAt: '12:12:12, 12.12.1212',
    createdBy: email1,
    updatedAt: '12:12:12, 12.12.1212',
    updatedBy: email1,
    customData: {
        likes: [],
        dislikes: [],
        attachments: [{name: 'file1.png', link: 'www.test.sk/file1.png', ext: '.png'}, {name: 'file2.png', link: 'www.test.sk/file2.png', ext: '.png'}, {name: 'file1.png', link: 'www.test.sk/file1_1.png', ext: '.png'}],
        timestamp: '12:12:12, 12.12.1212',
    }
};

export const message1Updated: IMessage = {
    id: '00001',
    value: 'new new message',
    createdAt: '12:12:12, 12.12.1212',
    createdBy: email1,
    updatedAt: '12:12:12, 12.12.1212',
    updatedBy: email1,
    customData: {
        likes: [],
        dislikes: [],
        attachments: [{name: 'file1.png', link: 'www.test.sk/file1.png', ext: '.png'}, {name: 'file2.png', link: 'www.test.sk/file2.png', ext: '.png'}, {name: 'file1.png', link: 'www.test.sk/file1_1.png', ext: '.png'}],
        timestamp: '12:12:12, 12.12.1214',
    }
};

export const message2: IMessage = {
    id: '00002',
    value: 'new message',
    createdAt: '12:12:12, 12.12.1212',
    createdBy: email1,
    updatedAt: '12:12:12, 12.12.1212',
    updatedBy: email1,
    customData: {
        likes: [],
        dislikes: [],
        attachments: [{name: 'file1.png', link: 'www.test.sk/file1.png', ext: '.png'}, {name: 'file2.png', link: 'www.test.sk/file2.png', ext: '.png'}, {name: 'file1.png', link: 'www.test.sk/file1_1.png', ext: '.png'}],
        timestamp: '12:12:12, 12.12.1212',
    }
};

export const messagesArrayResponse: IMessage[] = [newMessageWithoutAttachmentsResponse, newMessageWithAttachmentsResponse];

export const channel1: IChannel = {
    id: '001',
    name: 'channel1',
    customData: {
        owner: email1,
        description: 'text',
        users: [email1],
        timestamp: '12:12:12, 12.12.1212',
    },
};

export const channel1Updated: IChannel = {
    id: '001',
    name: 'channel1Updated',
    customData: {
        owner: email1,
        description: 'textefwfew',
        users: [email1],
        timestamp: '12:12:12, 12.12.1214',
    },
};

export const channel2: IChannel = {
    id: '002',
    name: 'channel2',
    customData: {
        owner: email2,
        description: 'texttext',
        users: [email2],
        timestamp: '12:12:12, 12.12.1212',
    },
};

export const channelsArrayResponse: IChannel[] = [channel1, channel2];

export const channel1Map = Map({'001': new ChannelRecord(channel1)});
export const channel1UpdatedMap = Map({'001': new ChannelRecord(channel1Updated)});
export const channel2Map = Map({'002': new ChannelRecord(channel2)});
export const bothChannelsMap = Map({'001': new ChannelRecord(channel1), '002': new ChannelRecord(channel2)});
export const bothChannelsUpdatedMap = Map({'001': new ChannelRecord(channel1Updated), '002': new ChannelRecord(channel2)});

export const user1Record = new StateUserRecord({isLogged: true, email: user1.email, nick: user1.customData.nick, avatar: user1.customData.avatar, channelsOrder: user1.customData.channelsOrder, token});
export const user1UpdatedRecord = new StateUserRecord({isLogged: true, email: user1Updated.email, nick: user1Updated.customData.nick, avatar: user1Updated.customData.avatar, channelsOrder: user1Updated.customData.channelsOrder, token});

export const message1Map = OrderedMap({'00001': new MessageRecord(message1)});
export const messagesMap = OrderedMap({'00001': new MessageRecord(message1), '00002': new MessageRecord(message2)});
export const messagesUpdatedMap = OrderedMap({'00001': new MessageRecord(message1Updated), '00002': new MessageRecord(message2)});

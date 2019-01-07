import {IMessageCustomData} from '../model/stateMessages';

export interface IApiAuth {
    token: string;
    expiration: string;
}

export interface IApiUser {
    email: string;
    customData: {
        nick: string;
        avatar: string;
        channelsOrder: string[];
    };
}

export interface IApiMessage {
    value: string;
    customData: IMessageCustomData;
}

export interface IApiFileInfo {
    id: string;
    name: string;
    extension: string;
    createdBy: string;
    fileSize: number;
}

export interface IApiFileUri {
    fileUri: string;
}

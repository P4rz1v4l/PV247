import {authToken, channel1, channel2, channelsArrayResponse, messagesArrayResponse, newMessageWithAttachmentsResponse, newMessageWithoutAttachmentsResponse, newUser, user1, user2} from './testData';

export const fail400 = {
    status: 400,
};

export const fail404 = {
    status: 404,
};

export const success200 = {
    status: 200,
};

export const successUser1Data = {
    status: 200,
    body: user1
};

export const successUser2Data = {
    status: 200,
    body: user2
};

export const successNewUserData = {
    status: 200,
    body: newUser
};

export const successAuth = {
    status: 200,
    body: authToken
};

export const successNewMessageWithoutAttachments = {
    status: 200,
    body: newMessageWithoutAttachmentsResponse
};

export const successNewMessageWithAttachments = {
    status: 200,
    body: newMessageWithAttachmentsResponse
};

export const successMessages = {
    status: 200,
    body: messagesArrayResponse
};

export const successChannel1Data = {
    status: 200,
    body: channel1
};

export const successChannel2Data = {
    status: 200,
    body: channel2
};

export const successChannels = {
    status: 200,
    body: channelsArrayResponse
};

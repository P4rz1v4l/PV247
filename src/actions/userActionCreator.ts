import {
    USER_LOGIN_SUCCESS,
    USER_UPDATE_SUCCESS,
} from '../constants/usersActionsTypes';
import { Dispatch } from 'redux';
import {changingNameUser, loginningUser, changingAvatarUser} from './appActionCreator';
import {ApiError} from '../model/apiError';
import {fetchUserLogin} from '../util/fetchUserLogin';
import {fetchUserSignup} from '../util/fetchUserSignup';
import {fetchUserInfo} from '../util/fetchUserInfo';
import {IState} from '../model/state';
import {fetchUserUpdate} from '../util/fetchUserUpdate';
import {IApiUser, IApiFileInfo, IApiFileUri, IApiAuth} from '../util/apiInterfaces';
import {errorAdd} from './errorsActionCreators';
import {getDownloadLink, uploadFile} from '../util/uploadFile';


const userLoginSuccess = (userData: IApiUser, loginData: IApiAuth ): any => ({
    type: USER_LOGIN_SUCCESS,
    payload: {
        email: userData.email,
        nick: userData.customData.nick,
        avatar: userData.customData.avatar,
        channelsOrder: userData.customData.channelsOrder,
        token: loginData.token
    }
});

export const userLogin = (email: string): any => {
    return (dispatch: Dispatch) => {
        dispatch(loginningUser(true));

        return fetchUserSignup(email)
            .then(() => {
                return fetchUserLogin(email)
                    .then((loginData) => {
                        return fetchUserInfo(email, loginData.token)
                            .then((userData: IApiUser) => {
                                dispatch(userLoginSuccess(userData, loginData));
                                dispatch(loginningUser(false));
                            });
                    });
            })
            .catch((errorSignup: ApiError) => {
                if (errorSignup.getCode() === 400) {
                    return fetchUserLogin(email)
                        .then((loginData) => {
                            return fetchUserInfo(email, loginData.token)
                                .then((userData: IApiUser) => {
                                    dispatch(userLoginSuccess(userData, loginData));
                                    dispatch(loginningUser(false));
                                });
                        })
                        .catch(() => {
                            dispatch(errorAdd('Error: Login account'));
                            dispatch(loginningUser(false));
                        });
                }
                else {
                    dispatch(errorAdd('Error: Login account'));
                    dispatch(loginningUser(false));
                    return;
                }
            });
    };
};

export const userUpdateSuccess = (userData: {email: string, customData: {nick: string, avatar: string, channelsOrder: string[]}} ): any => ({
    type: USER_UPDATE_SUCCESS,
    payload: {
        email: userData.email,
        nick: userData.customData.nick,
        avatar: userData.customData.avatar,
        channelsOrder: userData.customData.channelsOrder,
    }
});

export const userChangeNick = (nick: string): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        dispatch(changingNameUser(true));

        return fetchUserInfo(getState().user.email, getState().user.token)
            .then((userData) => {
                return fetchUserUpdate({...userData, customData: {...userData.customData, nick}}, getState().user.token)
                    .then((newUserData) => {
                        dispatch(userUpdateSuccess(newUserData));
                        dispatch(changingNameUser(false));
                    });
            })
            .catch(() => {
                dispatch(errorAdd('Error: Edit nick'));
                dispatch(changingNameUser(false));
            });
    };
};

export const userChangeAvatar = (data: File): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        dispatch(changingAvatarUser(true));

        return uploadFile(data, getState().user.token)
            .then((fileInfo: IApiFileInfo[]) => {
                return getDownloadLink(fileInfo[0].id, getState().user.token)
                    .then((link: IApiFileUri) => {
                        return fetchUserInfo(getState().user.email, getState().user.token)
                            .then((userData) => {
                                return fetchUserUpdate({...userData, customData: {...userData.customData, avatar: link.fileUri}}, getState().user.token)
                                    .then((newUserData) => {
                                        dispatch(userUpdateSuccess(newUserData));
                                        dispatch(changingAvatarUser(false));
                                    });
                            });
                    });
            })
            .catch(() => {
                dispatch(errorAdd('Error: Edit avatar'));
                dispatch(changingAvatarUser(false));
            });
    };
};

export const userChangeChannelsOrder = (channelsOrder: string[]): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        return fetchUserInfo(getState().user.email, getState().user.token)
            .then((userData) => {
                return fetchUserUpdate({...userData, customData: {...userData.customData, channelsOrder}}, getState().user.token)
                    .then((newUserData) => {
                        dispatch(userUpdateSuccess(newUserData));
                    });
            })
            .catch(() => {
                dispatch(errorAdd('Error: Change order channel'));
            });
    };
};

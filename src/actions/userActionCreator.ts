import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE, USER_UPDATE_SUCCESS,
} from '../constants/usersActionsTypes';
import { Dispatch } from 'redux';
import {changingNameUser, loginningUser} from './appActionCreator';
import {ApiError} from '../model/apiError';
import {fetchUserLogin} from '../util/fetchUserLogin';
import {fetchUserSignup} from '../util/fetchUserSignup';
import {fetchUserInfo} from '../util/fetchUserInfo';
import {IState} from '../model/state';
import {fetchUserUpdate} from '../util/fetchUserUpdate';


const userLoginSucces = (userData: {email: string, customData: {nick: string, avatar: string, channelsOrder: string[]}}, loginData: {token: string; expiration: string} ): any => ({
    type: USER_LOGIN_SUCCESS,
    payload: {
        email: userData.email,
        nick: userData.customData.nick,
        avatar: userData.customData.avatar,
        channelsOrder: userData.customData.channelsOrder,
        token: loginData.token
    }
});

const userLoginFail = (message: string): any => ({
    type: USER_LOGIN_FAILURE,
    payload: {
        message
    }
});

export const userLogin = (email: string): any => {
    return (dispatch: Dispatch) => {
        dispatch(loginningUser(true));

        fetchUserLogin(email)
            .then((loginData) => {
                fetchUserInfo(email, loginData.token)
                    .then((userData) => {
                        dispatch(userLoginSucces(userData, loginData));
                        dispatch(loginningUser(false));
                    })
                    .catch((errorUsersInfo) => {
                        dispatch(userLoginFail('Error: ' + errorUsersInfo.getCode().toString() + ' ' + errorUsersInfo.getMessage()));
                        dispatch(loginningUser(false));
                    });
            })
            .catch((errorLogin: ApiError) => {
                if (errorLogin.getCode() === 400) {
                    fetchUserSignup(email)
                        .then(() => {
                            fetchUserLogin(email)
                                .then((loginData) => {
                                    fetchUserInfo(email, loginData.token)
                                        .then((userData) => {
                                            dispatch(userLoginSucces(userData, loginData));
                                            dispatch(loginningUser(false));
                                        });
                                });
                        })
                        .catch((errorSignup: ApiError) => {
                            dispatch(userLoginFail('Error: ' + errorSignup.getCode().toString() + ' ' + errorSignup.getMessage()));
                            dispatch(loginningUser(false));
                        });
                }
                else {
                    dispatch(userLoginFail('Error: ' + errorLogin.getCode().toString() + ' ' + errorLogin.getMessage()));
                    dispatch(loginningUser(false));
                }
            });
    };
};

const userUpdateSucces = (userData: {email: string, customData: {nick: string, avatar: string, channelsOrder: string[]}} ): any => ({
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

        fetchUserInfo(getState().user.email, getState().user.token)
            .then((userData) => {
                fetchUserUpdate({...userData, customData: {...userData.customData, nick}}, getState().user.token)
                    .then((newUserData) => {
                        dispatch(userUpdateSucces(newUserData));
                        dispatch(changingNameUser(false));
                    });
            })
            .catch((errorSignup: ApiError) => {
                console.log(errorSignup);
                dispatch(changingNameUser(false));
            });
    };
};
import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
} from '../constants/usersActionsTypes';
import { Dispatch } from 'redux';
import { loginningUser } from './appActionCreator';
import {ApiError} from '../model/apiError';
import {fetchLoginUserInfo, fetchUserLogin} from '../util/fetchUserLogin';
import {fetchUserSignup} from '../util/fetchUserSignup';


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

export function userLogin(email: string): any {
    return (dispatch: Dispatch) => {
        dispatch(loginningUser(true));

        fetchUserLogin(email)
            .then((loginData) => {
                fetchLoginUserInfo(email, loginData.token)
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
                                    fetchLoginUserInfo(email, loginData.token)
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
}

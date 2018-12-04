import {
    USER_LOGIN_SUCCESS,
} from '../constants/usersActionsTypes';
import { AppId } from '../constants/appId';
import { Dispatch } from 'redux';
import { loginningUser } from './appActionCreator';


export const userLoginSucces = (user: boolean): any => ({
    type: USER_LOGIN_SUCCESS,
    payload: {
        user
    }
});


export function userLogin(email: string): any {
    return (dispatch: Dispatch ) => {
        dispatch(loginningUser(true));

        fetch(
            'https://pv247messaging.azurewebsites.net/api/v2/' + AppId + '/user',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    email,
                    customData: {}
                })
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(email);
                console.log(data);
                dispatch(userLoginSucces(data));
                dispatch(loginningUser(false));
            })
            .catch((error) => {
                console.log(email);
                console.log(error);
            });
    };
}

import { AUTH_TYPES } from './types';
import { SignIn } from '../helpers/controllers/Auth';
import MessageHandler from '../components/component/MessageHandler';

export const Login = (object) => async dispatch => {
    dispatch({ type: AUTH_TYPES.LOGIN_REQUEST });
    const response = await SignIn(object);
    if (response) {
        dispatch({
            type: AUTH_TYPES.LOGIN_SUCCESS
        });
    } else {
        MessageHandler("Error iniciando sesión");
        dispatch({
            type: AUTH_TYPES.LOGIN_FAILURE
        });
    }
}

export const Logout = (token) => async dispatch => {
    dispatch({ type: AUTH_TYPES.LOGOUT_REQUEST });

    // const response = await Singout(token);
    // if (response.statusCode === 200) {
    //     dispatch({
    //         type: AUTH_TYPES.LOGOUT_SUCCESS
    //     });
    // } else {
    //     dispatch({
    //         type: AUTH_TYPES.LOGOUT_FAILURE
    //     });
    // }
}

export const ChangeFirstTime = () => async dispatch => {
    dispatch({ type: AUTH_TYPES.CHANGE_FIRST_TIME });
}

export const CleanUp = () => async dispatch => {
    dispatch({ type: AUTH_TYPES.CLEANUP });
}
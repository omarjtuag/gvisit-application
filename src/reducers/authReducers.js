import { AUTH_TYPES } from '../actions/types';

const initialState = {
    isLogged: false,
    isLoading: false,
    isAdmin: false,
    isFirsttime: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_TYPES.LOGIN_REQUEST:
            return {
                ...state,
                isLogged: false,
                isLoading: true
            };
        case AUTH_TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLogged: true,
            };
        case AUTH_TYPES.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isLogged: false,
            };
        case AUTH_TYPES.LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case AUTH_TYPES.LOGOUT_SUCCESS:
            return {};
        case AUTH_TYPES.CLEANUP:
            state.isLoading = false;
            state.isLogged = false;
            state.isAdmin = false;
            return {
                ...state
            };
        case AUTH_TYPES.CHANGE_FIRST_TIME:
            state.isFirsttime = false;
            return {
                ...state
            };
        case AUTH_TYPES.LOGOUT_FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}
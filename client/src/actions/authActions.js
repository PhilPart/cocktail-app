import {loginUser, logoutUser, registerUser} from '../services/api';

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            const user = await loginUser(username, password);
            dispatch(loginSuccess(user));
        } catch (error) {
            dispatch(loginFailure(error.message));
        }
    };
};

export const register = (username, email, password) => {
    return async (dispatch) => {
        try {
            await registerUser(username, email, password);
            dispatch(registerSuccess());
        } catch (error) {
            dispatch(registerFailure(error.message));
        }
    };
};

export const logout = () => {
    return (dispatch) => {
        logoutUser();
        dispatch(logoutSuccess());
    };
};

const registerSuccess = () => ({
    type: 'REGISTER_SUCCESS'
});

const registerFailure = (error) => ({
    type: 'REGISTER_FAILURE',
    payload: error,
});

const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
});

const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});

const logoutSuccess = () => ({
    type: 'LOGOUT'
});

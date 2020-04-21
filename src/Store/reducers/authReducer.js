import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  isLoginLoading: false,
  isLoginError: false,
  loginError: '',
  isLoginSuccess: false,
  isSignupLoading: false,
  isSignupSuccess: false,
  isSignupError: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOG_IN:
      return {
        ...state,
        user: null,
        isLoginLoading: true,
        isLoginError: false,
        isLoginSuccess: false,
      };
    case actionTypes.LOG_IN_FAIL:
      const error =
        action.payload.error === actionTypes.LOGIN_ERROR_PASSWORD
          ? 'Incorrect password. Please check your password and try again.'
          : 'Username not found. Please try again.';
      return {
        ...state,
        user: null,
        isLoginLoading: false,
        isLoginError: true,
        loginError: error,
        isLoginSuccess: false,
      };
    case actionTypes.LOG_IN_SUCCESS:
      return {
        ...state,
        isLoginSuccess: true,
        user: {
          user: {
            username: action.payload.username,
            password: action.payload.password,
          },
        },
        isLoginLoading: false,
        isLoginError: false,
      };
    case actionTypes.SIGN_UP:
      return {
        ...state,
        isSignupLoading: true,
        isSignupError: false,
        isSignupSuccess: false,
        user: null,
      };
    case actionTypes.SIGN_UP_FAIL:
      return {
        ...state,
        user: null,
        isSignupError: true,
        isSignupSuccess: false,
      };
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        user: {
          user: {
            username: action.payload.username,
            password: action.payload.password,
          },
        },
        isSignupError: false,
        isSignupSuccess: true,
        isSignupLoading: false,
      };
    case actionTypes.LOG_OUT:
      return {
        ...state,
        isLoginSuccess: false,
        user: null,
        isLoginLoading: false,
      };
    default:
      return state;
  }
};

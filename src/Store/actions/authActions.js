import AsyncStorage from '@react-native-community/async-storage';
import * as actionTypes from './actionTypes';

export const getLogin = () => ({type: actionTypes.LOG_IN});

export const getLoginSuccess = (username, password) => ({
  type: actionTypes.LOG_IN_SUCCESS,
  payload: {username, password},
});

export const getLoginFail = type => {
  return {
    type: actionTypes.LOG_IN_FAIL,
    payload: {
      error: type,
    },
  };
};

export const fetchLogin = (username, password) => {
  return async dispatch => {
    dispatch(getLogin());
    try {
      let allUsers = await AsyncStorage.getItem('ALL_USERS');
      if (allUsers) {
        allUsers = JSON.parse(allUsers);
        const user = allUsers.find(res => res.user.username === username);
        if (user) {
          if (user.user.password === password) {
            await AsyncStorage.setItem('user', JSON.stringify(user));
            dispatch(getLoginSuccess(username, password));
          } else {
            dispatch(getLoginFail(actionTypes.LOGIN_ERROR_PASSWORD));
          }
        } else {
          dispatch(getLoginFail(actionTypes.LOGIN_ERROR_ACCOUNT));
        }
      } else {
        dispatch(getLoginFail(actionTypes.LOGIN_ERROR_ACCOUNT));
      }
    } catch (e) {
      dispatch(getLoginFail(actionTypes.LOGIN_ERROR_ACCOUNT));
    }
  };
};

export const getSignup = () => ({type: actionTypes.SIGN_UP});

export const getSignupSuccess = (username, password) => ({
  type: actionTypes.SIGN_UP_SUCCESS,
  payload: {
    username: username,
    password: password,
  },
});

export const getSignupFail = () => ({type: actionTypes.SIGN_UP_FAIL});

export const signupNow = (username, password) => {
  return async dispatch => {
    try {
      let allUsers = await AsyncStorage.getItem('ALL_USERS');
      console.log(allUsers);

      if (allUsers) {
        allUsers = JSON.parse(allUsers);
        const user = allUsers.find(res => res.user.username === username);
        if (user) {
          dispatch(getSignupFail());
        } else {
          let newUser = {
            user: {
              username: username,
              password: password,
            },
          };
          allUsers.push(newUser);
          const allUser = ['ALL_USERS', JSON.stringify(allUsers)];
          const newOne = ['user', JSON.stringify(newUser)];
          await AsyncStorage.multiSet([allUser, newOne]);
          dispatch(getSignupSuccess(username, password));
        }
      } else {
        let newUser = {
          user: {
            username: username,
            password: password,
          },
        };
        let newList = [];
        newList.push(newUser);
        const allUser = ['ALL_USERS', JSON.stringify(newList)];
        const newOne = ['user', JSON.stringify(newUser)];
        await AsyncStorage.multiSet([allUser, newOne]);
        dispatch(getSignupSuccess(username, password));
      }
    } catch (e) {
      dispatch(getSignupFail());
    }
  };
};

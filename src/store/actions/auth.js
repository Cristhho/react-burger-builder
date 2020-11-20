import axios from 'axios';

import * as actionTypes from './actionTypes';

const SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnmGp-JpCD2lTjzcyAlIE2f1CtSKw96YE';
const SIGNIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnmGp-JpCD2lTjzcyAlIE2f1CtSKw96YE';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
}

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
}

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    axios.post(isSignup ? SIGNUP_URL : SIGNIN_URL, authData)
      .then((res) => {
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      })
  };
}
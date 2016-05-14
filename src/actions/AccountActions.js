import * as types from '../constants/ActionTypes';
const Rebase = require('re-base');
const base = Rebase.createClass('https://energybee.firebaseio.com');

export function loginUser(email, password, auth) {
  return { type: types.LOGIN_USER, email, password, auth}
}

export function attemptLogin(email, password) {
  return dispatch => {
    base.authWithPassword({
      email,
      password
    }, (error) => {
      if (error) {
        dispatch(failLogin(error));
      }
      else {
        dispatch(loginUser(email, password, base.getAuth()));
      }
    });
  }
}

export function failLogin(error){
  return { type: types.FAIL_LOGIN, error }
}

export function logoutUser() {
  base.unauth();
  return { type: types.LOGOUT_USER }
}

export function createUser(email, password) {
    return dispatch => {
      base.createUser({
        email,
        password
      }, (error) => {
        if (error) {
          dispatch(failCreateUser(error));
        }
        else {
          dispatch(attemptLogin(error));
        }
      });
    }
}

export function failCreateUser(error){
  return { type: types.FAIL_CREATE_USER, error }
}

export function getUserAuth(){
  let auth = base.getAuth();
  return { type: types.GET_USER_AUTH, auth }
}

export function resetPassword(email, password) {
  // TODO -- Add firebase reset
  return { type: types.RESET_PASSWORD, email, password }
}

export function addFriend(email) {
  // TODO -- Add friend code
  return { type: types.ADD_FRIEND, email }
}

export function removeFriend(email) {
  // TODO -- Add friend code
  return { type: types.REMOVE_FRIEND, email }
}

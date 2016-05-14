import {LOGIN_USER, FAIL_LOGIN, FAIL_CREATE_USER, LOGOUT_USER, GET_USER_AUTH} from '../constants/ActionTypes'

export default function account(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
          email: action.email,
          auth: action.auth
      }

    case LOGOUT_USER:
      return {}

    case FAIL_LOGIN:
    case FAIL_CREATE_USER:
      return {
        error : action.error
      }

    case GET_USER_AUTH:
      return {
        auth: action.auth
      }

    default:
      return state
  }
}

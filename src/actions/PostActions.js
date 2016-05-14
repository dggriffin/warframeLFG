import * as types from '../constants/ActionTypes';
const Rebase = require('re-base');
const base = Rebase.createClass('https://energybee.firebaseio.com');

export function openPostForm() {
  return { type: types.OPEN_POST_FORM }
}

export function closePostForm() {
  return { type: types.CLOSE_POST_FORM }
}

export function validateForm(form, step) {
  switch(case) {
    case 'user':
      break;
    case 'mission':
      break;
    case 'party':
      break;
  }
  return true;
}

export function continuePostWizard(form, step) {
  return dispatch => {
    switch(case){
      case 'user':
        if (validateForm(form, step)) {
          dispatch(storeUserDetails(form));
        }
        else {
          dispatch(failValidation(step));
        }
        break;
      case 'mission':
        if (validateForm(form, step)) {
          dispatch(storeMissionDetails(form));
        }
        else {
          dispatch(failValidation(step));
        }
        break;
      case 'party':
        if (validateForm(form, step)) {
          dispatch(storePartyDetails(form));
        }
        else {
          dispatch(failValidation(step));
        }
        break;
    }
  }
}

export function storeUserDetails(form) {
  return { type: types.STORE_USER_DETAILS, form }
}

export function storeMissionDetails(form) {
  return { type: types.STORE_MISSION_DETAILS, form }
}

export function storePartyDetails(form) {
  return { type: types.STORE_PARTY_DETAILS, form }
}

export function generateQuestions(type) {
  return { type: types.GENERATE_QUESTIONS, type }
}

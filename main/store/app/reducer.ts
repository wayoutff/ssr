import { produce } from 'immer'
import { ActionTypes } from './actions'
import { Action, AppState, UserActionTypes } from './types'

export const initialState = Object.freeze({
  locale: 'en_US',
  count: 0,
  currentUser: null,
  error: '',
})

export default (state: AppState = initialState, action: Action): AppState =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.SETLOCALE: {
        draft.locale = action.payload
        return
      }
      case ActionTypes.INC: {
        draft.count = draft.count + action.payload
      }
      case UserActionTypes.SIGN_IN_SUCCESS:
        return {
          ...state,
          currentUser: action.payload,
          error: '',
        };
      case UserActionTypes.SIGN_UP_SUCCESS:
        return {
          ...state,
          currentUser: action.payload,
          error: '',
        };
      case UserActionTypes.SIGN_OUT_SUCCESS:
        return {
          ...state,
          currentUser: null,
          error: '',
        };
      case UserActionTypes.SIGN_IN_FAILURE:
      case UserActionTypes.SIGN_IN_FAILURE:
      case UserActionTypes.SIGN_OUT_FAILURE:
        return {
          ...state,
          currentUser: null,
          error: action.payload,
        };
      default:
        return state;
    }
  })

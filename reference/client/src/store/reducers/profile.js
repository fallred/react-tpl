import * as actionTypes from "../action-types";
import { LOGIN_TYPES } from "@/constants";
let initialState = {
  loginState: LOGIN_TYPES.UN_VALIDATE,
  user: null,
  error: null
};
export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.VALIDATE:
      if (action.payload.success) {
        return {
          ...state,
          loginState: LOGIN_TYPES.LOGINED,
          user: action.payload.data,
          error: null
        };
      } else {
        return {
          ...state,
          loginState: LOGIN_TYPES.UNLOGIN,
          user: null,
          error: action.payload
        };
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        loginState: LOGIN_TYPES.UN_VALIDATE,
        user: null,
        error: null,
      };
    case actionTypes.CHANGE_AVATAR:
      return { ...state, user: { ...state.user, avatar: action.payload } };
    default:
      return state;
  }
}
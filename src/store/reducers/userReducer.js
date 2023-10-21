import { SUCCESS_LOGIN, FAILED_LOGIN, REQUEST_LOGIN, SUCCESS_LOGOUT, SUCCESS_REGISTER, REQUEST_REGISTER, FAILED_REGISTER, REQUEST_LOGOUT, FAILED_LOGOUT } from "../actionTypes/userActionType"

const initState = {
  loading: false,
  error: false,
  user: {name:"moin"}
}
export const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case REQUEST_LOGIN:
      return {...state, loading: true}
    case SUCCESS_LOGIN:
      return {...state, loading: false, error: false, user: payload.user}
    case FAILED_LOGIN:
      return {...state, loading: false, user: {}, error: payload}
    case REQUEST_REGISTER:
      return {...state, loading: true}
    case SUCCESS_REGISTER:
      return {...state, loading: false, error: false, user: payload.user}
    case FAILED_REGISTER:
      return {...state, loading: false, user: {}, error: payload}
    case REQUEST_LOGOUT:
      return {...state, loading: true}
    case SUCCESS_LOGOUT:
      return {...state, loading: false, error: false, user: {}}
    case FAILED_LOGOUT:
      return {...state, loading: false, error: false}
    default:
      return state
  }
}


// import axios from "axios";
import { API } from "../../constants/api";
import { SUCCESS_LOGIN, SUCCESS_LOGOUT, SUCCESS_REGISTER, REQUEST_LOGIN, FAILED_LOGIN, REQUEST_LOGOUT, REQUEST_REGISTER, FAILED_REGISTER, FAILED_LOGOUT } from "../actionTypes/userActionType";
const configs = {
  headers: {
    "Content-Type":"application/json"
  },
  withCredentials: true
}

export const loginUser = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LOGIN })
    const { data } = await API.post('/login', payload, configs)
    console.log('login user', data)
    dispatch({type: SUCCESS_LOGIN, payload: data})
  } catch (error) {
    console.log('login user error', error)
    dispatch({type: FAILED_LOGIN, payload: error?.response?.data.message || 'Internal Server Error'})
  }
}
export const registerUser = (payload) => async (dispatch) => {
  try {
    dispatch({type: REQUEST_REGISTER})
    const { data } = await API.post('/register', payload, configs)
    console.log('register user', data)
    dispatch({type: SUCCESS_REGISTER, payload: data})
  } catch (error) {
    console.log('register user error', error)
    dispatch({type: FAILED_REGISTER, payload: error?.response?.data.message || 'Internal Server Error'})
  }
}
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LOGOUT })
    const { data } = await API.get('/logout', configs)
    console.log('logout user', data)
    dispatch({type: SUCCESS_LOGOUT, payload: data})
  } catch (error) {
    console.log('logout user error', error)
    dispatch({type: FAILED_LOGOUT, payload: error})
  }
}


export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LOGIN })
    const { data } = await API.get('/profile', configs)
    console.log('get user profile', data)
    dispatch({type: SUCCESS_LOGIN, payload: data})
  } catch (error) {
    console.log('get user profile error', error)
    dispatch({type: FAILED_LOGIN, payload: error})
  }
}

import {
  SUCCESS_GET_ALL_PRODUCTS,
  REQUEST_GET_ALL_PRODUCTS,
  FAILED_GET_ALL_PRODUCTS,
  // CLEAR_ALL_ERROR
  } from "../actionTypes/productActionType";

const initState = {
  products: [],
  loading: true,
  error: false
}

export const productReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case REQUEST_GET_ALL_PRODUCTS: {
      return { ...state, loading: true }
    }
    case SUCCESS_GET_ALL_PRODUCTS: {
      return { products: payload.data, loading: false, error: false}
    }
    case FAILED_GET_ALL_PRODUCTS: {
      return { products: [], loading: false, error: payload}
    }
    // case CLEAR_ALL_ERROR: {
    //   return {...state, error: false}
    // }
    default: {
      return state
    }
  }
}

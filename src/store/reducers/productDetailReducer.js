import { 
  CLEAR_ALL_ERROR,
  FAILED_GET_SINGLE_PRODUCT,
  SUCCESS_GET_SINGLE_PRODUCT,
  REQUEST_GET_SINGLE_PRODUCT
} from "../actionTypes/productActionType"


const initState = {
  product: {},
  loading: false,
  error: false
}

export const productDetailReducer = (state = initState, { type, payload }) => {
  console.log('reducer', type, payload)
  switch (type) {
    case REQUEST_GET_SINGLE_PRODUCT: {
      return { ...state, loading: true }
    }
    case SUCCESS_GET_SINGLE_PRODUCT: {
      return { ...state, product: payload, loading: false }
    }
    case FAILED_GET_SINGLE_PRODUCT: {
      return  {...state, loading: false, error: payload}
    }
    case CLEAR_ALL_ERROR: {
      return {...state, error: false}
    }
    default: {
      return state
    }
  }
}

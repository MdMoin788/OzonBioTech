
import { API } from "../../constants/api"
import {
  REQUEST_GET_ALL_PRODUCTS,
  SUCCESS_GET_ALL_PRODUCTS,
  FAILED_GET_ALL_PRODUCTS,
  REQUEST_GET_SINGLE_PRODUCT,
  SUCCESS_GET_SINGLE_PRODUCT,
  FAILED_GET_SINGLE_PRODUCT,
  REQUEST_CREATE_PRODUCT,
  SUCCESS_CREATE_PRODUCT,
  FAILED_CREATE_PRODUCT,
  REQUEST_UPDATE_PRODUCT,
  SUCCESS_UPDATE_PRODUCT,
  FAILED_UPDATE_PRODUCT,
  REQUEST_DELETE_PRODUCT,
  SUCCESS_DELETE_PRODUCT,
  FAILED_DELETE_PRODUCT,
  CLEAR_ALL_ERROR
} from "../actionTypes/productActionType"

export const getAllProducts = (query) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_GET_ALL_PRODUCTS })
    const { data } = await API.get('/products', {
      params: query,
    })
    console.log('all products', data)
    dispatch({type: SUCCESS_GET_ALL_PRODUCTS, payload: data})
  } catch (error) {
    console.log('all products error', error)
    dispatch({ type: FAILED_GET_ALL_PRODUCTS, payload: error?.response?.data.message || 'Internal Server Error'})
  }
}

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_GET_SINGLE_PRODUCT })
    const { data } = await API.get('/product/' + id)
    console.log('single product : ', data)
    dispatch({ type: SUCCESS_GET_SINGLE_PRODUCT, payload: data?.data })
  } catch (error) {
    console.log('single product error',error)
    dispatch({ type: FAILED_GET_SINGLE_PRODUCT, payload: error?.response?.data.message || 'Internal Server Error' })
  }
}



// only for admin
export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_CREATE_PRODUCT })
    const { data } = await API.post('/product', product)
    console.log('create product', data)
    dispatch({ type: SUCCESS_CREATE_PRODUCT, payload: data })
  } catch (error) {
    console.log('create product error', error)
    dispatch({ type: FAILED_CREATE_PRODUCT, payload: error })
  }
}

export const updateProduct = (product, id) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_UPDATE_PRODUCT })
    const { data } = await API.patch(`/product/${id}`, product)
    console.log('update product', data)
    dispatch({ type: SUCCESS_UPDATE_PRODUCT, payload: data })
  } catch (error) {
    console.log('update product error', error)
    dispatch({ type: FAILED_UPDATE_PRODUCT, payload: error })
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_DELETE_PRODUCT })
    const { data } = await API.delete('/product', id)
    console.log('delete product', data)
    dispatch({ type: SUCCESS_DELETE_PRODUCT, payload: data })
  } catch (error) {
    console.log('delete product error', error)
    dispatch({ type: FAILED_DELETE_PRODUCT, payload: error })
  }
}

export const clearAllError = () => async (dispatch) => {
  dispatch({type: CLEAR_ALL_ERROR})
}
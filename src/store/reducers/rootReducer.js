
import { combineReducers } from 'redux'
import { productDetailReducer } from './productDetailReducer'
import { productReducer } from './productReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  user: userReducer,
})
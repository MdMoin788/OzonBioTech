

import {
  legacy_createStore,
  // compose,
  applyMiddleware
} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers/rootReducer'

const initialState = {}
const middleWares = [thunk]
export const store = legacy_createStore(rootReducer,initialState, composeWithDevTools(applyMiddleware(...middleWares)))

import { combineReducers } from "redux"
import currentUserReducer from "./CurrentUser"
import customAmountReducer from "./CustomAmount"
export default combineReducers({
    currentUserReducer,customAmountReducer
    })
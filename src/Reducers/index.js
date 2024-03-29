import { combineReducers } from "redux"
import currentUserReducer from "./CurrentUser"
import customAmountReducer from "./CustomAmount"
import bankListReducer from "./BankList"
export default combineReducers({
    currentUserReducer,customAmountReducer,bankListReducer
})
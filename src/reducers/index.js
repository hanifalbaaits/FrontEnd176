import { combineReducers } from "redux";
import companyReducer from "./companyReducers";
import errorReducer from "./errorReducers";
import userReducers from "./userReducers";
import menuReducers from "./menuReducers";

export default combineReducers({
  compay: companyReducer,
  useray: userReducers,
  menuay: menuReducers,
  errors: errorReducer
});

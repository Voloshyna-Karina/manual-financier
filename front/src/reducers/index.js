import {combineReducers} from "redux";
import userReducer from "./users.js";
import formReducer from "./form.js";

export default combineReducers( {
    form: formReducer,
    user: userReducer,
})
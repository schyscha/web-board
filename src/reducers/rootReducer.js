import nickReducer from "./nickReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    nick: nickReducer
});

export default rootReducer;

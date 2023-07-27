import { combineReducers } from "redux";
import modal from "./modal";
import schedule from "./schedule";
import rt from "./rt";

export default combineReducers({
    modal,
    rt,
    schedule,
})
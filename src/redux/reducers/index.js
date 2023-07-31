import { combineReducers } from "redux";
import modal from "./modal";
import schedule from "./schedule";
import rt from "./rt";
import statusrt from "./statusrt";

export default combineReducers({
    modal,
    rt,
    schedule,
    statusrt,
})
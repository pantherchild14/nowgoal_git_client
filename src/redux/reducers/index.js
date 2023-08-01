import { combineReducers } from "redux";
import modal from "./modal";
import schedule from "./schedule";
import rt from "./rt";
import statusrt from "./statusrt";
import oddssingle from "./oddssingle";
import schedulesingle from "./schedulesingle";

export default combineReducers({
    modal,
    rt,
    oddssingle,
    schedule,
    statusrt,
    schedulesingle,
})
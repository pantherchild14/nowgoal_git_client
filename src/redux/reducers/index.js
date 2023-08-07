import { combineReducers } from "redux";
import modal from "./modal";
import schedule from "./schedule";
import rt from "./rt";
import statusrt from "./statusrt";
import oddssingle from "./oddssingle";
import schedulesingle from "./schedulesingle";
import scheduleAllsingle from "./scheduleAllsingle";
import oddsAllsingle from "./oddsAllsingle";
import h2h from "./h2h";

export default combineReducers({
    modal,
    rt,
    oddssingle,
    schedule,
    statusrt,
    schedulesingle,
    scheduleAllsingle,
    oddsAllsingle,
    h2h
})
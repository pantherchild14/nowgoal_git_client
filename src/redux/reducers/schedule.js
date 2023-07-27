import { INIT_STATE } from "../../constant";
import { getSchedule, getType } from "../actions";

export default function scheduleReducers(state = INIT_STATE.schedule, action) {
    switch (action.type) {
        case getType(getSchedule.getSchedulesRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getSchedule.getScheduleSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getSchedule.getScheduleFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
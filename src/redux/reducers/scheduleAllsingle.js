import { INIT_STATE } from "../../constant";
import { getScheduleAllSingleRT, getType } from "../actions";

export default function scheduleAllSingleReducers(state = INIT_STATE.scheduleAllsingle, action) {
    switch (action.type) {
        case getType(getScheduleAllSingleRT.getScheduleAllSingleRTRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getScheduleAllSingleRT.getScheduleAllSingleRTSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getScheduleAllSingleRT.getScheduleAllSingleRTFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
import { INIT_STATE } from "../../constant";
import { getScheduleSingleRT, getType } from "../actions";

export default function scheduleSingleReducers(state = INIT_STATE.schedulesingle, action) {
    switch (action.type) {
        case getType(getScheduleSingleRT.getScheduleSingleRTRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getScheduleSingleRT.getScheduleSingleRTSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getScheduleSingleRT.getScheduleSingleRTFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
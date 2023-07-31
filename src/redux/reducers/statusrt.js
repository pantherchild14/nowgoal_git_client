import { INIT_STATE } from "../../constant";
import { getStatusRT, getType } from "../actions";

export default function statusrtReducers(state = INIT_STATE.statusrt, action) {
    switch (action.type) {
        case getType(getStatusRT.getStatusRTRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getStatusRT.getStatusRTSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getStatusRT.getStatusRTFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
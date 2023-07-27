import { INIT_STATE } from "../../constant";
import { getRT, getType } from "../actions";

export default function rtReducers(state = INIT_STATE.rt, action) {
    switch (action.type) {
        case getType(getRT.getRTRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getRT.getRTSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getRT.getRTFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
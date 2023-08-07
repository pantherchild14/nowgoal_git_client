import { INIT_STATE } from "../../constant";
import { getH2H, getType } from "../actions";

export default function h2hReducers(state = INIT_STATE.h2h, action) {
    switch (action.type) {
        case getType(getH2H.getH2HRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getH2H.getH2HSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getH2H.getH2HFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
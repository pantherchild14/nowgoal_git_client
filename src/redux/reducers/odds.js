import { INIT_STATE } from "../../constant";
import { getOddsAllRT, getType } from "../actions";

export default function oddsallReducers(state = INIT_STATE.oddsall, action) {
    switch (action.type) {
        case getType(getOddsAllRT.getOddsAllRTRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getOddsAllRT.getOddsAllRTSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getOddsAllRT.getOddsAllRTFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
import { INIT_STATE } from "../../constant";
import { getOddsAllSingleRT, getType } from "../actions";

export default function getOddsAllSingleReducers(state = INIT_STATE.oddsAllsingle, action) {
    switch (action.type) {
        case getType(getOddsAllSingleRT.getOddsAllSingleRTRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getOddsAllSingleRT.getOddsAllSingleRTSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getOddsAllSingleRT.getOddsAllSingleRTFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
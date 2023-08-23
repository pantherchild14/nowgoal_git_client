import { INIT_STATE } from "../../constant";
import { getOddsChangeDetailHistory, getType } from "../actions";

export default function oddschangedetailhistoryReducers(state = INIT_STATE.oddschangedetailhistory, action) {
    switch (action.type) {
        case getType(getOddsChangeDetailHistory.getOddsChangeDetailHistoryRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getOddsChangeDetailHistory.getOddsChangeDetailHistorySuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getOddsChangeDetailHistory.getOddsChangeDetailHistoryFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
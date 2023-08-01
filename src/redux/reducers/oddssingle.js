import { INIT_STATE } from "../../constant";
import { getOddsSingle, getType } from "../actions";

export default function oddsSingleReducers(state = INIT_STATE.oddssingle, action) {
    switch (action.type) {
        case getType(getOddsSingle.getOddsSingleRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getOddsSingle.getOddsSingleSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getOddsSingle.getOddsSingleFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
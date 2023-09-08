import { INIT_STATE } from "../../constant";
import { getCategory, getType } from "../actions";

export default function categoryReducers(state = INIT_STATE.category, action) {
    switch (action.type) {
        case getType(getCategory.getCategoryRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getCategory.getCategorySuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getCategory.getCategoryFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
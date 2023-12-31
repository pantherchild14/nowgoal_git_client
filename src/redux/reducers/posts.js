import { INIT_STATE } from "../../constant";
import { getPosts, getType } from "../actions";

export default function categoryReducers(state = INIT_STATE.posts, action) {
    switch (action.type) {
        case getType(getPosts.getPostsRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getPosts.getPostsSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getPosts.getPostsFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
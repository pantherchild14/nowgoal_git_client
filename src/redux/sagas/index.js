import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";


function* fetchScheduleSaga(action) {
    try {
        const schedule = yield call(api.fetchSchedule);
        yield put(actions.getSchedule.getScheduleSuccess(schedule.data));
    } catch (error) {
        console.error("Error fetching schedule:", error);
    }
}

function* fetchRTSaga(action) {
    try {
        const rt = yield call(api.fetchRT);
        yield put(actions.getRT.getRTSuccess(rt.data));
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}


function* myScheduleSaga() {
    yield takeLatest(actions.getSchedule.getSchedulesRequest, fetchScheduleSaga);
}

function* myrtSaga() {
    yield takeLatest(actions.getRT.getRTRequest, fetchRTSaga);
}

export { myScheduleSaga, myrtSaga };
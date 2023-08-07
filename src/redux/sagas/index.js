import { takeLatest, call, put, delay } from "redux-saga/effects";
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

function* fetchOddsSingleSaga(action) {
    try {
        const { id } = action.payload;
        const odds = yield call(api.fetchOddsSingleRT, id);
        yield put(actions.getOddsSingle.getOddsSingleSuccess(odds.data));
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchstatusRTSaga(action) {
    try {
        const statusrt = yield call(api.fetchStatusRT);
        yield put(actions.getStatusRT.getStatusRTSuccess(statusrt.data));
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchScheduleSingleSaga(action) {
    try {
        const { id } = action.payload;
        const schedule = yield call(api.fetchScheduleSingleRT, id);
        yield put(actions.getScheduleSingleRT.getScheduleSingleRTSuccess(schedule.data));
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchScheduleAllSingleSaga(action) {
    try {
        const { id } = action.payload;
        const schedule = yield call(api.fetchScheduleAllSingleRT, id);
        yield put(actions.getScheduleAllSingleRT.getScheduleAllSingleRTSuccess(schedule.data));
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}


function* fetchOddsAllSingleSaga(action) {
    try {
        const { id } = action.payload;
        while (true) {
            const odds = yield call(api.fetchOddsAllSingleRT, id);
            yield put(actions.getOddsAllSingleRT.getOddsAllSingleRTSuccess(odds.data));
            yield delay(10000);
        }
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchH2HSaga(action) {
    try {
        const { id } = action.payload;
        const h2h = yield call(api.fetchH2H, id);
        yield put(actions.getH2H.getH2HSuccess(h2h.data));
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

function* myOddsSingleSaga() {
    yield takeLatest(actions.getOddsSingle.getOddsSingleRequest, fetchOddsSingleSaga);
}

function* mystatysrtSaga() {
    yield takeLatest(actions.getStatusRT.getStatusRTRequest, fetchstatusRTSaga);
}

function* myScheduleSingleSaga() {
    yield takeLatest(actions.getScheduleSingleRT.getScheduleSingleRTRequest, fetchScheduleSingleSaga);
}

function* myScheduleAllSingleSaga() {
    yield takeLatest(actions.getScheduleAllSingleRT.getScheduleAllSingleRTRequest, fetchScheduleAllSingleSaga);
}

function* myOddsAllSingleSaga() {
    yield takeLatest(actions.getOddsAllSingleRT.getOddsAllSingleRTRequest, fetchOddsAllSingleSaga);
}

function* myH2HSaga() {
    yield takeLatest(actions.getH2H.getH2HRequest, fetchH2HSaga);
}

export { myScheduleSaga, myrtSaga, myOddsSingleSaga, mystatysrtSaga, myScheduleSingleSaga, myScheduleAllSingleSaga, myOddsAllSingleSaga, myH2HSaga };
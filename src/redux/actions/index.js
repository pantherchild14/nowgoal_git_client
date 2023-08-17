import { createActions, createAction } from "redux-actions";

export const getType = (reduxAction) => {
    return reduxAction().type;
};

export const getSchedule = createActions({
    getSchedulesRequest: undefined,
    getScheduleSuccess: (payload) => payload,
    getScheduleFailure: (err) => err,
});


export const getRT = createActions({
    getRTRequest: undefined,
    getRTSuccess: (payload) => payload,
    getRTFailure: (err) => err,
});

export const getOddsSingle = createActions({
    getOddsSingleRequest: (id) => ({ id }),
    getOddsSingleSuccess: (payload) => payload,
    getOddsSingleFailure: (err) => err,
});

export const getStatusRT = createActions({
    getStatusRTRequest: undefined,
    getStatusRTSuccess: (payload) => payload,
    getStatusRTFailure: (err) => err,
});


export const getScheduleSingleRT = createActions({
    getScheduleSingleRTRequest: (id) => ({ id }),
    getScheduleSingleRTSuccess: (payload) => payload,
    getScheduleSingleRTFailure: (err) => err,
});

export const getScheduleAllSingleRT = createActions({
    getScheduleAllSingleRTRequest: (id) => ({ id }),
    getScheduleAllSingleRTSuccess: (payload) => payload,
    getScheduleAllSingleRTFailure: (err) => err,
});

export const getOddsAllSingleRT = createActions({
    getOddsAllSingleRTRequest: (id) => ({ id }),
    getOddsAllSingleRTSuccess: (payload) => payload,
    getOddsAllSingleRTFailure: (err) => err,
});

export const getH2H = createActions({
    getH2HRequest: (id) => ({ id }),
    getH2HSuccess: (payload) => payload,
    getH2HFailure: (err) => err,
});

export const getUser = createActions({
    getUserRequest: (user) => ({ user }),
    getUserSuccess: (payload) => payload,
    getUserFailure: (err) => err,
});

export const showModal = createAction("SHOW_CREATE_POST_MODAL");
export const hideModal = createAction("HIDE_CREATE_POST_MODAL");
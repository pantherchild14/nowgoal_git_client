import axios from "axios";

const URL = `${process.env.REACT_APP_URL_SERVER}`;

// export const instance = axios.create({
//     baseURL: "http://localhost:5000",
// })

export const fetchSchedule = () => axios.get(`${URL}/schedule`);
export const fetchRT = () => axios.get(`${URL}/ajax/soccerajax/ch_odds_xml`);
export const fetchOddsSingleRT = (id) => axios.get(`${URL}/ajax/soccerajax/ch_oddsSignle_xml/${id}`);
export const fetchStatusRT = () => axios.get(`${URL}/ajax/soccerajax/ch_status_xml`);
export const fetchScheduleSingleRT = (id) => axios.get(`${URL}/ajax/soccerajax/ch_scheduleSingle_xml/${id}`);

export const fetchScheduleAllSingleRT = (id) => axios.get(`${URL}/ajax/soccerajax/ch_scheduleAll_xml/${id}`);
export const fetchOddsAllSingleRT = (id) => axios.get(`${URL}/ajax/soccerajax/ch_oddsAll_xml/${id}`);

export const fetchH2H = (id) => axios.get(`${URL}/ajax/soccerajax/ch_h2h_xml/${id}`);

export const fetchGetUser = (user) => axios.get(`${URL}/api/users/${user}`);

// Authentication
export const fetchRegistered = (data) => axios.post(`${URL}/api/users/auth/register`, data);
export const fetchLogin = (data) => axios.post(`${URL}/api/users/auth/login`, data);
export const fetchChangePassword = (data, config) => axios.post(`${URL}/api/users/change-password`, data, config);
import axios from "axios";

const URL = `${process.env.REACT_APP_URL_SERVER}`;

// export const instance = axios.create({
//     baseURL: "http://localhost:5000",
// })

export const fetchSchedule = (day) => axios.get(`${URL}/schedule/${day}`);
export const fetchRT = () => axios.get(`${URL}/ajax/soccerajax/ch_odds_xml`);
export const fetchOddAllRT = () => axios.get(`${URL}/ajax/soccerajax/ch_odds_all_xml`);
export const fetchOddsSingleRT = (id) => axios.get(`${URL}/ajax/soccerajax/ch_oddsSignle_xml/${id}`);
export const fetchStatusRT = () => axios.get(`${URL}/ajax/soccerajax/ch_status_xml`);
export const fetchScheduleSingleRT = (id) => axios.get(`${URL}/ajax/soccerajax/ch_scheduleSingle_xml/${id}`);

export const fetchScheduleAllSingleRT = (id) => axios.get(`${URL}/ajax/soccerajax/ch_scheduleAll_xml/${id}`);
export const fetchOddsAllSingleRT = (id) => axios.get(`${URL}/ajax/soccerajax/ch_oddsAll_xml/${id}`);

export const fetchH2H = (id) => axios.get(`${URL}/ajax/soccerajax/ch_h2h_xml/${id}`);
export const fetchOddsChangeDetailHistory = (id) => axios.get(`${URL}/ajax/soccerajax/odds_change_detail_history_xml/${id}`);

export const fetchGetUser = (user) => axios.get(`${URL}/api/users/${user}`);
export const fetchGetUsers = () => axios.get(`${URL}/api/users/`);

// Authentication
export const fetchRegistered = (data) => axios.post(`${URL}/api/users/auth/register`, data);
export const fetchLogin = (data) => axios.post(`${URL}/api/users/auth/login`, data);
export const fetchChangePassword = (data, config) => axios.post(`${URL}/api/users/change-password`, data, config);

//Post, Category
export const fetchGET_Post = () => axios.get(`${URL}/wp-admin/posts`);
export const fetchPOST_Post = (data) => axios.post(`${URL}/wp-admin/posts`, data);
export const fetchPut_Post = (id, data) => axios.put(`${URL}/wp-admin/posts/${id}`, data);
export const fetchDelete_Post = (id) => axios.delete(`${URL}/wp-admin/posts/${id}`);
export const fetchGET_Category = () => axios.get(`${URL}/wp-admin/categories`);
export const fetchPOST_Category = (data) => axios.post(`${URL}/wp-admin/categories`, data);

// Options, widgets
export const fetchGET_Option = (optionName) => axios.get(`${URL}/wp-admin/option/${optionName}`);
export const fetchPOST_Option = (data) => axios.post(`${URL}/wp-admin/option`, data);
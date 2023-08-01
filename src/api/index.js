import axios from "axios";

const URL = `${process.env.REACT_APP_URL_SERVER}`;

export const fetchSchedule = () => axios.get(`${URL}/schedule`);
export const fetchRT = () => axios.get(`${URL}/ajax/soccerajax/ch_odds_xml`);
export const fetchOddsSingleRT = (id) => axios.get(`${URL}/ajax/soccerajax/ch_oddsSignle_xml/${id}`);
export const fetchStatusRT = () => axios.get(`${URL}/ajax/soccerajax/ch_status_xml`);
export const fetchScheduleSingleRT = (id) => axios.get(`${URL}/ajax/soccerajax/ch_scheduleSingle_xml/${id}`);
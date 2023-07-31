import axios from "axios";

const URL = process.env.REACT_APP_URL_SERVER;

export const fetchSchedule = () => axios.get(`${URL}/schedule`);
export const fetchRT = () => axios.get(`${URL}/ajax/soccerajax/ch_odds_xml`);
export const fetchStatusRT = () => axios.get(`${URL}/ajax/soccerajax/ch_status_xml`);
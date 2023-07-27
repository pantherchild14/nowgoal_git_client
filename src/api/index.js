import axios from "axios";

const URL = 'http://localhost:5000';

export const fetchSchedule = () => axios.get(`${URL}/schedule`);
export const fetchRT = () => axios.get(`${URL}/odds/ch_goal_xml`);
import React from "react";
import { useDispatch } from "react-redux"

import useStyles from "./style";
import { showModal } from "../redux/actions";
import List6in1 from "../components/6in1";

const LiveScore = () => {
    const classes = useStyles();

    return (
        <List6in1 />
    );
};

export default LiveScore;

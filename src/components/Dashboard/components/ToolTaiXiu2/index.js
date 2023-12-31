import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import * as actions from "../../../../redux/actions";
import { scheduleState$, oddsallState$, statusrtState$ } from "../../../../redux/selectors";
import DateSelector from "./Functions/DateSelector";
import DataTable from "./DataTable";
import { UTCtoLocalTime, formatNumber } from "../../../../helpers";

const ToolTaiXiu2 = () => {
    const dispatch = useDispatch();
    const schedule = useSelector(scheduleState$);
    const odds = useSelector(oddsallState$);
    const statusRedux = useSelector(statusrtState$);

    const [newSocket, setSocket] = useState(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [bfRefresh, SetBfRefresh] = useState([]);
    const [selectedTimeRun, setSelectedTimeRun] = useState([]);
    const [timeRun, setTimeRun] = useState([]);
    const [threeIn1, Set3In1] = useState([]);
    const [oddRealTime, setOddRealTime] = useState([]);
    const [selectedTips, setSelectedTips] = useState(false);
    const [selectedOver, setSelectedOver] = useState(false);
    const [selectedTeamUp, setSelectedTeamUp] = useState("");
    const [selectedOddOver, setSelectedOddOver] = useState("");
    const [selectedOddOverRun, setSelectedOddOverRun] = useState("");

    const handleTipsCheckboxChange = (e) => {
        setSelectedTips(e.target.checked);
    };

    const handleOverCheckChange = (e) => {
        setSelectedOver(e.target.checked);
    }

    useEffect(() => {
        const fetchData = async (date) => {
            await Promise.all([
                dispatch(actions.getSchedule.getSchedulesRequest(date)),
                dispatch(actions.getOddsAllRT.getOddsAllRTRequest()),
                dispatch(actions.getStatusRT.getStatusRTRequest()),
            ]);
        };
        fetchData(selectedDate);
    }, [selectedDate]);

    useEffect(() => {
        var length = 0;
        length = bfRefresh?.length || 0;

        for (var i = 0; i < length; i++) {
            var D;
            D = bfRefresh?.[i]?.$;

            if (!D) continue;
            var tr = document.getElementById("tr_" + D.MATCH_ID);
            if (tr === null) continue;
            try {

                var DHandicapJson = JSON.parse(D.ODDS_AH_FT);
                var DOuJson = JSON.parse(D.ODDS_OU_FT);
                /* Asian Handicap */
                var upodds = tr.querySelector("#upodds_" + D.MATCH_ID);
                var downodds = tr.querySelector("#downodds_" + D.MATCH_ID);
                var goal = tr.querySelector("#goal_" + D.MATCH_ID);
                var goalLive = tr.querySelector("#goalLive_" + D.MATCH_ID);


                /* Over/Under */
                var goal_t1 = tr.querySelector("#goal_t1_" + D.MATCH_ID);
                var upodds_t = tr.querySelector("#upodds_t_" + D.MATCH_ID);
                var downodds_t = tr.querySelector("#downodds_t_" + D.MATCH_ID);

                updateElement(formatNumber(DHandicapJson.l.u), upodds);

                updateElemenAttribute((DHandicapJson.l.g) < 0 ? (-DHandicapJson.l.g) : (-DHandicapJson.l.g), goal, "odd_goal")
                updateElemenAttribute((DHandicapJson.l.g) < 0 ? (DHandicapJson.l.g) : (DHandicapJson.l.g), goalLive, "odd_goallive")


                updateElement((DHandicapJson.l.g) < 0 ? "" : (DHandicapJson.l.g), goal);
                updateElement((DHandicapJson.l.g) < 0 ? (-DHandicapJson.l.g) : "", goalLive);

                updateElement(formatNumber(DHandicapJson.l.d), downodds);

                updateElement(formatNumber(DOuJson.l.u), upodds_t);
                updateElement((DOuJson.l.g), goal_t1);
                updateElement(formatNumber(DOuJson.l.d), downodds_t);

                function updateElement(newValue, element) {
                    element.textContent = newValue;
                }
                function updateElemenAttribute(newValue, trElement, attributeName) {
                    trElement.setAttribute(attributeName, newValue);
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }


    }, [bfRefresh])

    useEffect(() => {


        const get3In1 = () => {
            const length = threeIn1?.length || 0;
            try {
                if (selectedTimeRun !== "") {
                    if (newSocket && isSocketConnected) {
                        newSocket.disconnect();
                        console.log("Socket disconnected due to selectedTimeRun change");
                    }

                    for (let i = 0; i < length; i++) {
                        const D = threeIn1?.[i]?.$;

                        if (!D) continue;

                        const tr = document.getElementById("tr_" + D._MATCH_ID);
                        if (!tr) continue;

                        try {
                            const odds = JSON.parse(D._ODDS);
                            const oddAH_ft = odds.ODDS_FT.AH;
                            const oddOU_ft = odds.ODDS_FT.OU;

                            updateAHOdds(tr, D, oddAH_ft, D._MATCH_ID);
                            updateOUOdds(tr, D, oddOU_ft);
                        } catch (error) {
                            console.error("Error parsing JSON:", error);
                        }
                    }
                } else {
                    if (newSocket && !isSocketConnected) {
                        newSocket.connect();
                        console.log("Socket connected due to selectedTimeRun change");
                    }
                }
            } catch (error) {
                console.error("Socket connection error:", error);
            }
        }

        // Hàm cập nhật AH odds
        const updateAHOdds = (tr, D, oddAH_ft, matchid) => {
            if (oddAH_ft && oddAH_ft.length > 0) {

                const currentTime = new Date();
                currentTime.setHours(currentTime.getHours() - selectedTimeRun);

                const nearestOdd = oddAH_ft.find(odd => {
                    const oddTime = new Date(odd.AH.mt * 1000 - 1 * 60 * 60 * 1000);

                    console.log('matchid', matchid, 'oddTime', oddTime);
                    if (oddTime <= currentTime) {
                        return odd;
                    }
                    return false; // Tiếp tục tìm odd khác
                });

                if (nearestOdd) {
                    const upodds = tr.querySelector("#upoddsEarly_" + D._MATCH_ID);
                    const downodds = tr.querySelector("#downoddsEarly_" + D._MATCH_ID);
                    const goal = tr.querySelector("#goalEarly_" + D._MATCH_ID);
                    const goalLive = tr.querySelector("#goalEarlyLive_" + D._MATCH_ID);

                    updateElement(formatNumber(nearestOdd.AH.odds.u), upodds);
                    updateAttri(goal, "odd_goal", (nearestOdd.AH.odds.g) < 0 ? (-nearestOdd.AH.odds.g) : (-nearestOdd.AH.odds.g))
                    updateAttri(goalLive, "odd_goallive", (nearestOdd.AH.odds.g) < 0 ? (nearestOdd.AH.odds.g) : (nearestOdd.AH.odds.g))

                    // updateElement((nearestOdd.AH.odds.g) < 0 ? (-nearestOdd.AH.odds.g) : (-nearestOdd.AH.odds.g), goal);
                    // updateElement((nearestOdd.AH.odds.g) < 0 ? (nearestOdd.AH.odds.g) : (nearestOdd.AH.odds.g), goalLive);
                    updateElement((nearestOdd.AH.odds.g) < 0 ? "" : (nearestOdd.AH.odds.g), goal);
                    updateElement((nearestOdd.AH.odds.g) < 0 ? (-nearestOdd.AH.odds.g) : "", goalLive);

                    updateElement(formatNumber(nearestOdd.AH.odds.d), downodds);
                }
            }
        }

        // Hàm cập nhật OU odds
        const updateOUOdds = (tr, D, oddOU_ft) => {
            if (oddOU_ft && oddOU_ft.length > 0) {
                const currentTime = new Date();
                currentTime.setHours(currentTime.getHours() - selectedTimeRun);

                const nearestOdd = oddOU_ft.find(odd => {
                    const oddTime = new Date(odd.OU.mt * 1000);

                    if (oddTime <= currentTime) {
                        return odd;
                    }
                    return false;
                });

                if (nearestOdd) {
                    const goal_t1 = tr.querySelector("#goalEarly_t1_" + D._MATCH_ID);
                    const upodds_t = tr.querySelector("#upoddsEarly_t_" + D._MATCH_ID);
                    const downodds_t = tr.querySelector("#downoddsEarly_t_" + D._MATCH_ID);

                    updateElement(formatNumber(nearestOdd.OU.odds.u), upodds_t);
                    updateElement((nearestOdd.OU.odds.g), goal_t1);
                    updateElement(formatNumber(nearestOdd.OU.odds.d), downodds_t);
                }
            }
        }

        // Hàm cập nhật phần tử HTML
        const updateElement = (newValue, element) => {
            element.innerHTML = newValue;
        }

        const updateAttri = (tr, elementAttri, newValue) => {
            return tr.attributes[`${elementAttri}`].value = newValue;
        }

        get3In1();
    }, [selectedTimeRun]);

    useEffect(() => {
        var length = 0;
        length = oddRealTime?.length || 0;


        for (var i = 0; i < length; i++) {
            var D;
            D = oddRealTime?.[i]?.$;
            if (!D) continue;
            var odds = D;
            var tr = document.getElementById("tr_" + D.MATCH_ID);
            if (tr === null) continue;
            try {
                var oddsValue = tr.attributes["odds_rt"]?.value;

                /* Asian Handicap */
                var upodds = tr.querySelector("#upoddsRun_" + D.MATCH_ID);
                var downodds = tr.querySelector("#downoddsRun_" + D.MATCH_ID);
                var goal = tr.querySelector("#goalRun_" + D.MATCH_ID);

                /* Over/Under */
                var goal_t1 = tr.querySelector("#goalRun_t1_" + D.MATCH_ID);
                var upodds_t = tr.querySelector("#upoddsRun_t_" + D.MATCH_ID);
                var downodds_t = tr.querySelector("#downoddsRun_t_" + D.MATCH_ID);

                if (oddsValue && oddsValue.trim() !== "") {
                    const old = JSON.parse(oddsValue);
                    if (old.unknow14 === "1") {
                        updateElement(formatNumber(D.HomeHandicap), formatNumber(old.HomeHandicap), "upoddsRun_", upodds);
                        updateElement((D.Handicap) < 0 ? (-D.Handicap) : (D.Handicap), (old.Handicap) < 0 ? (-old.Handicap) : (old.Handicap), "goalRun_", goal);
                        updateElement(formatNumber(D.AwayHandicap), formatNumber(old.AwayHandicap), "downoddsRun_", downodds);

                        updateElement(formatNumber(D.Over), formatNumber(old.Over), "upoddsRun_t_", upodds_t);
                        updateElement((D.Goals), (old.Goals), "goalRun_t1_", goal_t1);
                        updateElement(formatNumber(D.Under), formatNumber(old.Under), "downoddsRun_t_", downodds_t);
                    }
                }
                function updateElement(newValue, oldValue, elementPrefix, element) {
                    if (parseFloat(oldValue) !== parseFloat(newValue)) {
                        if (parseFloat(oldValue) > parseFloat(newValue)) {
                            newValue = '<span class="down">' + newValue + '</span>';

                        } else if (parseFloat(oldValue) < parseFloat(newValue)) {
                            newValue = '<span class="up">' + newValue + '</span>';
                        }
                    }
                    element.innerHTML = newValue;
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
            tr.attributes["odds_rt"].value = JSON.stringify(odds);
        }
    }, [oddRealTime])

    useEffect(() => {
        var length = 0;
        length = timeRun?.length || 0;

        for (var i = 0; i < length; i++) {
            var D;
            D = timeRun?.[i]?.$;
            if (!D) continue;
            let tr = document.getElementById("tr_" + D.MATCH_ID);
            if (tr === null) continue;

            try {
                const startMatchTimer = () => {
                    if (D.STATE === undefined || D.TIME === undefined || D.SCORE_HOME === undefined || D.SCORE_AWAY === undefined) {
                        // Nếu thiếu STATE hoặc TIME, không thực hiện gì cả.
                        return;
                    }
                    var currentTimeUTC = new Date();
                    const offsetHours = -7;
                    currentTimeUTC.setHours(currentTimeUTC.getHours() + offsetHours);
                    var _serverTime = `${currentTimeUTC.getFullYear()},${currentTimeUTC.getMonth()},${currentTimeUTC.getDate()},${currentTimeUTC.getHours()},${currentTimeUTC.getMinutes()},${currentTimeUTC.getSeconds()}`;

                    var difftime;
                    if (_serverTime) {
                        var sps = _serverTime.split(",");
                        difftime = new Date() - new Date(sps[0], sps[1], sps[2], sps[3], sps[4], sps[5]);
                    }

                    let ms = "";
                    let goTime = "";
                    const timeIcon = "<span class='in-gif'></span>";

                    // switch (STATE) {
                    //     case 5: ms = 'Pen.'; break; // Đá penalty
                    //     case 4: ms = 'ET'; break; // Thời gian bù giờ
                    //     case 3: ms = '2nd Half'; break; // Hiệp 2
                    //     case 2: ms = 'HT'; break; // Giữa hiệp
                    //     case 1: ms = '1st Half'; break; // Hiệp 1
                    //     default: ms = 'Unknown'; // Xử lý trạng thái không khớp
                    // }

                    if (D.STATE === '1') {
                        const currentTime = new Date();
                        const elapsedTime = currentTime - new Date(D.TIME) - difftime;
                        goTime = Math.floor(elapsedTime / 60000);

                        if (goTime < 1) {
                            goTime = "1";
                        } else if (goTime > 45) {
                            goTime = "45+";
                        }

                        ms += goTime + timeIcon;
                    } else if (D.STATE === '3') {
                        const currentTime = new Date();
                        const elapsedTime = (currentTime) - new Date(D.TIME) - difftime;
                        goTime = Math.floor(elapsedTime / 60000) + 46;

                        if (goTime < 46) {
                            goTime = "46";
                        } else if (goTime > 90) {
                            goTime = "90+";
                        }

                        ms += goTime + timeIcon;
                    } else if (D.STATE === '2') {
                        ms += "HT";
                    } else if (D.STATE === '4') {
                        ms += "ET";
                    } else if (D.STATE === '5') {
                        ms += "Pen";
                    } else if (D.STATE === '-1' || D.STATE === '-11') {
                        ms += "FT";

                    }
                    console.log(tr.attributes["data-s"].value);

                    const matchTimeElement = tr.querySelector(`#ms${D.MATCH_ID}`);
                    const hsElement = tr.querySelector(`#hs${D.MATCH_ID}`);
                    const gsElement = tr.querySelector(`#gs${D.MATCH_ID}`);

                    if (ms !== "") {
                        if (matchTimeElement) {
                            matchTimeElement.innerHTML = ms;
                        }
                        if (hsElement) {
                            hsElement.innerHTML = D.SCORE_HOME;
                        }
                        if (gsElement) {
                            gsElement.innerHTML = D.SCORE_AWAY;
                        }
                    }


                    setTimeout(startMatchTimer, 30 * 1000);
                }

                startMatchTimer();

            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }
    }, [timeRun])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const socket = io.connect(`${process.env.REACT_APP_URL_SERVER}`);
                socket.on("connect", () => {
                    setIsSocketConnected(true);
                    console.log("con sw");
                });

                socket.on("XML_ODDS", async (data) => {
                    try {
                        const dataJson = JSON.parse(data);
                        if (dataJson && dataJson['ODDS_DATA'] && dataJson['ODDS_DATA']['ODDS_ITEM']) {
                            SetBfRefresh(dataJson['ODDS_DATA']['ODDS_ITEM']);
                        }
                    } catch (error) {
                        console.error("Error while parsing JSON data:", error.message);
                    }
                });

                socket.on("ODDS", async (data) => {
                    try {
                        const dataJson = JSON.parse(data);
                        if (dataJson && dataJson['ODDS_DATA'] && dataJson['ODDS_DATA']['ODDS_ITEM']) {
                            const dataOdds = dataJson['ODDS_DATA']['ODDS_ITEM'];
                            setOddRealTime(dataOdds);
                        }
                    } catch (error) {
                        console.error("Error while parsing JSON data:", error.message);
                    }
                });

                socket.on("TIME_RUN", async (data) => {
                    try {
                        const dataJson = JSON.parse(data);
                        if (dataJson && dataJson['TIMES_DATA'] && dataJson['TIMES_DATA']['TIME_ITEM']) {
                            const data = (dataJson['TIMES_DATA']['TIME_ITEM']);
                            setTimeRun(data);

                        }
                    } catch (error) {
                        console.error("Error while parsing JSON data:", error.message);
                    }
                });

                // socket.on("SCHEDULE", async (data) => {
                //     try {
                //         const dataJson = JSON.parse(data);
                //         if (dataJson && dataJson['SCHEDULE_DATA'] && dataJson['SCHEDULE_DATA']['SCHEDULE_ITEM']) {
                //             tb_refresh(dataJson['SCHEDULE_DATA']['SCHEDULE_ITEM'], 1);
                //         }
                //     } catch (error) {
                //         console.error("Error while parsing JSON data:", error.message);
                //     }
                // });

                socket.on("3IN1", async (data) => {
                    try {
                        const dataJson = JSON.parse(data);
                        if (dataJson && dataJson['ODDS_DATA'] && dataJson['ODDS_DATA']['ODDS_ITEM']) {
                            Set3In1(dataJson['ODDS_DATA']['ODDS_ITEM']);
                        }
                    } catch (error) {
                        console.error("Error while parsing JSON data:", error.message);
                    }
                });

                socket.on("disconnect", () => {
                    setIsSocketConnected(false);
                    console.log("Socket disconnected");
                });

                setSocket(socket);

                return () => {
                    if (newSocket) {
                        newSocket.disconnect();
                    }
                    // socket.disconnect();
                };
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, []);


    if (schedule.data.length === 0 || odds.data.length === 0) {
        return <div style={{ textAlign: 'center' }}><CircularProgress /></div>;
    }


    return (
        <React.Fragment>
            <Box style={{ paddingBottom: '30px' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                    <Grid item xs={2}>
                        <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label>
                                Thời gian biến động kèo::
                                <select value={selectedTimeRun} onChange={(e) => setSelectedTimeRun(e.target.value)} >
                                    <option value="">All</option>
                                    <option value="3">3H</option>
                                    <option value="6">6H</option>
                                    <option value="12">12H</option>
                                    <option value="24">1 Ngày</option>
                                    <option value="48">2 Ngày</option>
                                    <option value="52">3 Ngày</option>
                                </select>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedTips}
                                    onChange={handleTipsCheckboxChange}
                                />
                                Handicap 0.25 vs Over {'>'}= 2.75
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label>
                                Đội kèo trên:
                                <select
                                    value={selectedTeamUp}
                                    onChange={(e) => setSelectedTeamUp(e.target.value)}
                                    disabled={selectedTips === true ? "" : "disabled"}
                                >
                                    <option value="">All</option>
                                    <option value="home">Home</option>
                                    <option value="away">Away</option>
                                </select>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label>
                                Lọc Odds Over:
                                <select
                                    value={selectedOddOver}
                                    onChange={(e) => setSelectedOddOver(e.target.value)}
                                    disabled={selectedTips === true ? "" : "disabled"}
                                >
                                    <option value="">All</option>
                                    <option value="1">1.00</option>
                                    <option value="0.95">0.95</option>
                                    <option value="0.90">0.90</option>
                                    <option value="0.85">0.85</option>
                                    <option value="0.80">0.80</option>
                                </select>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={2}>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedOver}
                                    onChange={handleOverCheckChange}
                                    disabled={selectedTips === true ? "" : "disabled"}
                                />
                                OVER 2.75
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label>
                                Lọc Odds Cược Chấp:
                                <select
                                    value={selectedOddOverRun}
                                    onChange={(e) => setSelectedOddOverRun(e.target.value)}
                                    disabled={selectedTips === true ? "" : "disabled"}
                                >
                                    <option value="">All</option>
                                    <option value="1">1.00</option>
                                    <option value="0.95">0.95</option>
                                    <option value="0.90">0.90</option>
                                </select>
                            </label>
                        </div>
                    </Grid>
                </Grid>
            </Box>
            <TableContent schedule={schedule} statusRedux={statusRedux} odds={odds} selectedTips={selectedTips} selectedTeamUp={selectedTeamUp} selectedOver={selectedOver} selectedOddOver={selectedOddOver} selectedOddOverRun={selectedOddOverRun} />
        </React.Fragment>
    );
};

export default ToolTaiXiu2;

const TableContent = ({ schedule, odds, statusRedux, selectedTips, selectedTeamUp, selectedOver, selectedOddOver, selectedOddOverRun }) => {
    const sortedMatches = useMemo(() => {
        return schedule.data.sort((a, b) => {
            const timeA = new Date(a.MATCH_TIME);
            const timeB = new Date(b.MATCH_TIME);
            return timeA - timeB;
        });
    }, [schedule.data]);

    return (
        <table className="tooltaixiu2 dntable-list -td-0 table table-hover table-striped table-bordered align-middle">
            <thead>
                <tr>
                    <td rowSpan="2" className="td-time">Time</td>
                    <td rowSpan="2" className="td-league">League</td>
                    <td rowSpan="2" className="td-match">Match</td>
                    <td rowSpan="2" className="td-match">Score</td>
                    <td colSpan="6" className="td-handicap">Kèo Handicap</td>
                    <td colSpan="6" className="td-overunder">Over/Under</td>
                    <td rowSpan="2" className="td-handicap">Tips</td>
                    <td colSpan="2" className="td-handicap">Kèo Handicap (Run)</td>
                    <td colSpan="2" className="td-overunder">Over/Under (Run)</td>
                    <td rowSpan="2" className="td-view"></td>
                </tr>
                <tr>
                    <td className="td-handicap-live">Kèo Live</td>
                    <td className="td-handicap-odds-live">Odds Live</td>
                    <td className="td-handicap-slot-open">Kèo Mở</td>
                    <td className="td-handicap-odds-open">Odds Mở</td>
                    <td className="td-handicap-bd-live">Biến động<br />kèo(Live)</td>
                    <td className="td-handicap-odds-bd">Odds<br />biến động</td>

                    <td className="td-overunder-keo-live">Kèo Live</td>
                    <td className="td-overunder-odds">Odds live</td>
                    <td className="td-overunder-slot-open">Kèo mở</td>
                    <td className="td-overunder-odds">Odds mở</td>
                    <td className="td-overunder-bd-live">Biến động<br />Live</td>
                    <td className="td-overunder-odds-bd">Odds<br />biến động</td>

                    <td className="td-handicap-keo-run">Kèo Run</td>
                    <td className="td-handicap-odds">Odds Run</td>

                    <td className="td-overunder-keo-run">Kèo Run</td>
                    <td className="td-overunder-odds">Odds Run</td>

                </tr>
            </thead>
            <tbody id="tbody-data" className="tbody-data">
                <React.Fragment>
                    {sortedMatches.filter((match) => match.STATUS >= 1).map((e) => {
                        const oddsItemData = odds.data?.ODDS_DATA?.ODDS_ITEM;
                        const matchedOddsItem = oddsItemData?.find(item => item?.$?.MATCH_ID === e.MATCH_ID);

                        const scheduleItemDataRT = statusRedux.data?.SCHEDULE_DATA?.SCHEDULE_ITEM;
                        const matchedScheduleItemRT = scheduleItemDataRT?.find(item => item.$?.MATCH_ID === e.MATCH_ID);

                        if (matchedOddsItem) {
                            return <DataTable key={e.MATCH_ID} e={e} odds={matchedOddsItem} statusRedux={matchedScheduleItemRT} selectedTips={selectedTips} selectedTeamUp={selectedTeamUp} selectedOver={selectedOver} selectedOddOver={selectedOddOver} selectedOddOverRun={selectedOddOverRun} />;
                        }
                        return null;
                    })}

                    {sortedMatches.filter((match) => match.STATUS <= 0).map((e) => {
                        const oddsItemData = odds.data?.ODDS_DATA?.ODDS_ITEM;
                        const matchedOddsItem = oddsItemData?.find(item => item?.$?.MATCH_ID === e.MATCH_ID);

                        const scheduleItemDataRT = statusRedux.data?.SCHEDULE_DATA?.SCHEDULE_ITEM;
                        const matchedScheduleItemRT = scheduleItemDataRT?.find(item => item.$?.MATCH_ID === e.MATCH_ID);

                        if (matchedOddsItem) {
                            return <DataTable key={e.MATCH_ID} e={e} odds={matchedOddsItem} statusRedux={matchedScheduleItemRT} selectedTips={selectedTips} selectedTeamUp={selectedTeamUp} selectedOver={selectedOver} selectedOddOver={selectedOddOver} selectedOddOverRun={selectedOddOverRun} />;
                        }
                        return null;
                    })}

                </React.Fragment>
            </tbody>
        </table>
    );
};

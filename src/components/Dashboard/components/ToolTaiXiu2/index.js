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

const ToolTaiXiu2 = () => {
    const dispatch = useDispatch();
    const schedule = useSelector(scheduleState$);
    const odds = useSelector(oddsallState$);
    const statusRedux = useSelector(statusrtState$);

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [bfRefresh, SetBfRefresh] = useState([]);
    const [oddRealTime, setOddRealTime] = useState([]);


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

                updateElement(DHandicapJson.l.u, upodds);
                updateElement(DHandicapJson.l.g < 0 ? -DHandicapJson.l.g : -DHandicapJson.l.g, goal);
                updateElement(DHandicapJson.l.g < 0 ? DHandicapJson.l.g : DHandicapJson.l.g, goalLive);
                updateElement(DHandicapJson.l.d, downodds);

                updateElement(DOuJson.l.u, upodds_t);
                updateElement(DOuJson.l.g, goal_t1);
                updateElement(DOuJson.l.d, downodds_t);

                function updateElement(newValue, element) {
                    element.textContent = newValue;
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }


    }, [bfRefresh])

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
                    updateElement(D.HomeHandicap, old.HomeHandicap, "upoddsRun_", upodds);
                    updateElement(D.Handicap, old.Handicap, "goalRun_", goal);
                    updateElement(D.AwayHandicap, old.AwayHandicap, "downoddsRun_", downodds);

                    updateElement(D.Over, old.Over, "upoddsRun_t_", upodds_t);
                    updateElement(D.Goals, old.Goals, "goalRun_t1_", goal_t1);
                    updateElement(D.Under, old.Under, "downoddsRun_t_", downodds_t);
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
        const fetchData = async () => {
            try {
                const socket = io.connect(`${process.env.REACT_APP_URL_SERVER}`);
                socket.on("connect", () => {
                    console.log("con ws");
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

                // socket.on("3IN1", async (data) => {
                //   try {
                //     const dataJson = JSON.parse(data);
                //     if (dataJson && dataJson['ODDS_DATA'] && dataJson['ODDS_DATA']['ODDS_ITEM']) {
                //       Set3In1(dataJson['ODDS_DATA']['ODDS_ITEM']);
                //     }
                //   } catch (error) {
                //     console.error("Error while parsing JSON data:", error.message);
                //   }
                // });

                return () => {
                    socket.disconnect();
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
                </Grid>
            </Box>
            <TableContent schedule={schedule} statusRedux={statusRedux} odds={odds} />
        </React.Fragment>
    );
};

export default ToolTaiXiu2;

const TableContent = ({ schedule, odds, statusRedux }) => {
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
                            return <DataTable key={e.MATCH_ID} e={e} odds={matchedOddsItem} statusRedux={matchedScheduleItemRT} />;
                        }

                        return null;
                    })}

                    {sortedMatches.filter((match) => match.STATUS <= 0).map((e) => {
                        const oddsItemData = odds.data?.ODDS_DATA?.ODDS_ITEM;
                        const matchedOddsItem = oddsItemData?.find(item => item?.$?.MATCH_ID === e.MATCH_ID);

                        const scheduleItemDataRT = statusRedux.data?.SCHEDULE_DATA?.SCHEDULE_ITEM;
                        const matchedScheduleItemRT = scheduleItemDataRT?.find(item => item.$?.MATCH_ID === e.MATCH_ID);

                        if (matchedOddsItem) {
                            return <DataTable key={e.MATCH_ID} e={e} odds={matchedOddsItem} statusRedux={matchedScheduleItemRT} />;
                        }
                        return null;
                    })}

                </React.Fragment>
            </tbody>
        </table>
    );
};

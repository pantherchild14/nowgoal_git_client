import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import * as actions from "../../../../../redux/actions";
import { oddDetailHistoryState$ } from "../../../../../redux/selectors";
import OddDetailModal from "./OddDetailModal";
import { UTCtoLocalTime } from "../../../../../helpers";

const DataTable = (props) => {
    const { e, odds, oddsRedux, statusRedux } = props;
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const oddDetailHistory = useSelector(oddDetailHistoryState$);

    const oddRT = oddsRedux?.$;
    const scheduleRT = statusRedux?.$;
    const isLocalTimeZone = localStorage.getItem('TIME_ZONE')

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleViewClick = () => {
        dispatch(actions.getOddsChangeDetailHistory.getOddsChangeDetailHistoryRequest(e.MATCH_ID));
        handleOpen();
    };

    useEffect(() => {
        const sreachOdd = (elementId, tr) => {
            const element = tr.querySelector(elementId);
            if (element) {
                const textContent = element.textContent;
                if (textContent !== null) {
                    return parseFloat(textContent);
                }
            }
            return 0;
        };

        const insertData = (tr, data) => {
            const { elementId, sumData } = data;
            const insertElement = tr.querySelector(elementId);
            if (insertElement) {
                insertElement.innerHTML = sumData.toFixed(2);
            }
        };


        const Odd = async () => {
            const tr = document.getElementById("tr_" + e.MATCH_ID);
            if (tr !== null) {
                const dataToInsert = [
                    {
                        elementIdGoal: `#goal_${e.MATCH_ID}`,
                        liveElementIdGoalLive: `#goalLive_${e.MATCH_ID}`
                    },
                    {
                        elementId: `#insertGoal_${e.MATCH_ID}`,
                        sumData: await sreachOdd(`#goalEarly_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_${e.MATCH_ID}`, tr),
                    },
                    {
                        elementId: `#insertGoalLive_${e.MATCH_ID}`,
                        sumData: await sreachOdd(`#goalEarlyLive_${e.MATCH_ID}`, tr) - await sreachOdd(`#goalLive_${e.MATCH_ID}`, tr)
                    },
                    {
                        elementId: `#insertUpOdd_${e.MATCH_ID}`,
                        sumData: await sreachOdd(`#upoddsEarly_${e.MATCH_ID}`, tr) - await sreachOdd(`#upodds_${e.MATCH_ID}`, tr)
                    },
                    {
                        elementId: `#insertDownOdd_${e.MATCH_ID}`,
                        sumData: await sreachOdd(`#downoddsEarly_${e.MATCH_ID}`, tr) - await sreachOdd(`#downodds_${e.MATCH_ID}`, tr)
                    },
                    /* Over/Under */
                    {
                        elementId: `#insertGoal_t1_${e.MATCH_ID}`,
                        sumData: await sreachOdd(`#goalEarly_t1_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr)
                    },
                    {
                        elementId: `#insertUpodds_t_${e.MATCH_ID}`,
                        sumData: await sreachOdd(`#upoddsEarly_t_${e.MATCH_ID}`, tr) - await sreachOdd(`#upodds_t_${e.MATCH_ID}`, tr)
                    },
                    {
                        elementId: `#insertDownodds_t_${e.MATCH_ID}`,
                        sumData: await sreachOdd(`#downoddsEarly_t_${e.MATCH_ID}`, tr) - await sreachOdd(`#downodds_t_${e.MATCH_ID}`, tr)
                    },
                ];

                for (const data of dataToInsert) {
                    const liveElement = tr.querySelector(data.liveElementIdGoalLive);
                    const element = tr.querySelector(data.elementIdGoal);

                    if (element && liveElement) {
                        const value = parseFloat(element.textContent);

                        if (value < 0) {
                            liveElement.textContent = -value;
                        } else {
                            liveElement.textContent = -value;
                        }
                    }

                    await insertData(tr, data);
                }
            }
        }

        Odd();
        const intervalIdOdds = setInterval(Odd, 3000);

        return () => {
            clearInterval(intervalIdOdds);
        };
    }, []);

    const oddsKeys = ['ODDS_AH_FT', 'ODDS_AH_HT', 'ODDS_EURO_FT', 'ODDS_EURO_HT', 'ODDS_OU_FT', 'ODDS_OU_HT'];
    const parseJSON = (jsonString) => {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return {};
        }
    };

    const parsedOdds = oddsKeys.reduce((acc, key) => {
        acc[key] = parseJSON(odds.$[key]);
        return acc;
    }, {});

    const { ODDS_AH_FT, ODDS_AH_HT, ODDS_EURO_FT, ODDS_EURO_HT, ODDS_OU_FT, ODDS_OU_HT } = parsedOdds;

    const timestamp = new Date(e.TIME_STAMP);
    const hours = timestamp.getUTCHours().toString().padStart(2, "0");
    const minutes = timestamp.getUTCMinutes().toString().padStart(2, "0");
    const day = timestamp.getUTCDate();
    const month = (timestamp.getUTCMonth() + 1).toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes} <br/> ${day}/${month}`;

    return (
        <tr matchid={e.MATCH_ID} id={`tr_${e.MATCH_ID}`} odds={JSON.stringify(e)} chOdds={ODDS_AH_FT.f.g} data-s={scheduleRT?.STATUS ? scheduleRT?.STATUS : e?.STATUS} data-t={JSON.stringify(scheduleRT) ? JSON.stringify(scheduleRT) : ""} >
            <td className="td-time" style={{ width: '5%' }} dangerouslySetInnerHTML={{ __html: UTCtoLocalTime(e.TIME_STAMP, isLocalTimeZone) }}></td>
            {/* <td className="td-timestart" dangerouslySetInnerHTML={{ __html: formattedTime }}></td> */}
            <td className="td-league">{e.LEAGUE_NAME}</td>
            <td className="td-match"><div><p className="">{e.HOME_NAME}</p> <p className="">{e.AWAY_NAME}</p></div></td>
            <td className="td-handicap-live">
                <div className="tr__row">
                    <div className="tr__col handicap.instantHandicap" id={`goal_${e.MATCH_ID}`}><span>{oddRT && oddRT.Handicap !== undefined ? oddRT.Handicap : ODDS_AH_FT.r.g}</span></div>
                    <div className="tr__col handicap.instantHandicap" id={`goalLive_${e.MATCH_ID}`}><span>{oddRT && oddRT.Handicap !== undefined ? oddRT.Handicap : ODDS_AH_FT.r.g}</span></div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col handicap.instantHome" id={`upodds_${e.MATCH_ID}`}>{oddRT && oddRT.HomeHandicap !== undefined ? oddRT.HomeHandicap : ODDS_AH_FT.r.u}</div>
                    <div className="tr__col handicap.instantAway" id={`downodds_${e.MATCH_ID}`}>{oddRT && oddRT.AwayHandicap !== undefined ? oddRT.AwayHandicap : ODDS_AH_FT.r.d}</div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col handicap.initialHandicap" id={`goalEarly_${e.MATCH_ID}`}><span>{ODDS_AH_FT.f.g < 0 ? -ODDS_AH_FT.f.g : ODDS_AH_FT.f.g}</span></div>
                    <div className="tr__col handicap.initialHandicap" id={`goalEarlyLive_${e.MATCH_ID}`}><span>{ODDS_AH_FT.f.g < 0 ? ODDS_AH_FT.f.g : -ODDS_AH_FT.f.g}</span></div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col handicap.initialHome" id={`upoddsEarly_${e.MATCH_ID}`}>{ODDS_AH_FT.f.u}</div>
                    <div className="tr__col handicap.initialAway" id={`downoddsEarly_${e.MATCH_ID}`}>{ODDS_AH_FT.f.d}</div>
                </div>
            </td>


            <td className="td-handicap-bd-live">
                <div className="tr__row_remove">
                    <div className="tr__col handicap.initialHandicap-handicap.instantHandicap" id={`insertGoal_${e.MATCH_ID}`}></div>
                    <div className="tr__col el--up handicap.initialHandicap.-handicap.instantHandicap" id={`insertGoalLive_${e.MATCH_ID}`}><span></span></div>
                </div>
            </td>
            <td className="td-handicap-odds-bd">
                <div className="tr__row">

                    <div className="tr__col handicap.initialHome-handicap.instantHome" id={`insertUpOdd_${e.MATCH_ID}`}></div>
                    <div className="tr__col handicap.initialAway-handicap.instantAway" id={`insertDownOdd_${e.MATCH_ID}`}></div>
                </div>
            </td>


            <td className="td-handicap-tips">
                <div className="tr__row_remove">
                    <div className="tr__col handicap.fluctuatingHandicap"><span>Montenegro (W) U19 +0</span></div>
                </div>
            </td>
            <td>
                <div className="tr__row_remove">
                    <div className="tr__col overUnder.instantHandicap" id={`goal_t1_${e.MATCH_ID}`}>{ODDS_OU_FT.r.g}</div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col overUnder.instantOver" id={`upodds_t_${e.MATCH_ID}`}>{ODDS_OU_FT.r.d}</div>
                    <div className="tr__col overUnder.instantUnder" id={`downodds_t_${e.MATCH_ID}`}>{ODDS_OU_FT.r.u}</div>
                </div>
            </td>
            <td>
                <div className="tr__row_remove">
                    <div className="tr__col overUnder.initialHandicap" id={`goalEarly_t1_${e.MATCH_ID}`}>{ODDS_OU_FT.f.g}</div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col overUnder.initialOver" id={`upoddsEarly_t_${e.MATCH_ID}`}>{ODDS_OU_FT.f.u}</div>
                    <div className="tr__col overUnder.initialUnder" id={`downoddsEarly_t_${e.MATCH_ID}`}>{ODDS_OU_FT.f.d}</div>
                </div>
            </td>

            {/* live  */}

            <td>
                <div className="tr__row_remove">
                    <div className="tr__col overUnder.initialHandicap - overUnder.instantHandicap" id={`insertGoal_t1_${e.MATCH_ID}`}></div>
                </div>
            </td>
            <td>
                <div className="tr__row">

                    <div className="tr__col overUnder.initialOver - overUnder.instantOver" id={`insertUpodds_t_${e.MATCH_ID}`}></div>

                    <div className="tr__col overUnder.initialUnder - overUnder.instantUnder" id={`insertDownodds_t_${e.MATCH_ID}`}></div>
                </div>
            </td>

            {/* live  */}

            <td className="td-overunder-tip"><div className="tr__row_remove"><div className="tr__col overUnder.fluctuatingHandicap"><span><span>-</span></span></div></div></td>
            <td className="td-viewfull">
                <Button onClick={handleViewClick}>View</Button>
                <OddDetailModal open={open} handleClose={handleClose} oddDetailHistory={oddDetailHistory} />
            </td>
        </tr>
    );
};

export default DataTable;
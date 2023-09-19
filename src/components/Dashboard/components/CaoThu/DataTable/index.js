import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from '@mui/material/Button';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import * as actions from "../../../../../redux/actions";
import { oddDetailHistoryState$ } from "../../../../../redux/selectors";
import OddDetailModal from "./OddDetailModal";
import { UTCtoLocalTime } from "../../../../../helpers";
import MatchPage from "../../../../../pages/MatchPage";

const DataTable = (props) => {
    const { e, odds, statusRedux, selectedTeamUp } = props;
    const dispatch = useDispatch();
    const [tipHandicap, setTipHandicap] = useState("");
    const [tipOU, setTipOU] = useState("");
    const [open, setOpen] = React.useState(false);
    const oddDetailHistory = useSelector(oddDetailHistoryState$);

    const scheduleRT = statusRedux?.$;
    const isLocalTimeZone = localStorage.getItem('TIME_ZONE')

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleViewClickButton = () => {
        let params = '';

        if (tipHandicap !== '') {
            params += `ah=${tipHandicap}`;
        }

        if (tipOU !== '') {
            if (params !== '') {
                params += '&';
            }
            params += `ou=${tipOU}`;
        }

        const newUrl = `/match/${e.MATCH_ID}${params !== '' ? `?${params}` : ''}`;
        window.open(newUrl, '_blank');
    };

    const handleViewClick = () => {
        dispatch(actions.getOddsChangeDetailHistory.getOddsChangeDetailHistoryRequest(e.MATCH_ID));
        handleOpen();
    };
    useEffect(() => {
        var tr = document.getElementById("tr_" + e.MATCH_ID);
        var teamValue = tr.attributes["team"].value;

        if (selectedTeamUp === 'away') {
            if (teamValue === `meHome_${e.MATCH_ID}` || teamValue === "") {
                tr.style.display = 'none';
            }
        } else if (selectedTeamUp === 'home') {
            if (teamValue === `meAway_${e.MATCH_ID}` || teamValue === "") {
                tr.style.display = 'none';
            }
        } else {
            //   tr.style.display = 'table-row'; // Hiển thị tất cả khi không có lựa chọn
        }
    }, [selectedTeamUp]);




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
            const { elementId_positive, sumData_positive, elementId_minus, sumData_minus, tip, tipOU, checkTipsDataHome, checkTipsDataAway, checkTipsDataOU, awayID, homeID, oddHome, oddAway, oddOU } = data;
            const insertElement_positive = tr.querySelector(elementId_positive);
            const insertElement_minus = tr.querySelector(elementId_minus);
            const insertTips = tr.querySelector(tip);
            const insertTipsOU = tr.querySelector(tipOU);
            const home = tr.querySelector(homeID);
            const away = tr.querySelector(awayID);

            if (insertElement_positive) {
                let iconColor = 'transparent';
                let icon = '';
                let absSumData = '0';

                if (sumData_positive > 0) {
                    iconColor = 'green';
                    icon = '▲';
                } else if (sumData_positive < 0) {
                    iconColor = 'red';
                    icon = '▼';
                }

                if (sumData_positive !== 0) {
                    absSumData = Math.abs(sumData_positive).toFixed(2);
                }

                const iconElement = document.createElement('span');
                iconElement.style.color = iconColor;
                iconElement.textContent = icon;

                const absSumDataText = document.createTextNode(absSumData);

                insertElement_positive.innerHTML = '';
                insertElement_positive.appendChild(absSumDataText);

                if (icon !== '') {
                    insertElement_positive.appendChild(iconElement);
                }
            }

            if (insertElement_minus) {
                let iconColor = 'transparent';
                let icon = '';
                let absSumData = '0';

                if (sumData_minus < 0) {
                    iconColor = 'green';
                    icon = '▲';
                } else if (sumData_minus > 0) {
                    iconColor = 'red';
                    icon = '▼';
                }

                if (sumData_minus !== 0) {
                    absSumData = Math.abs(sumData_minus).toFixed(2);
                }

                const iconElement = document.createElement('span');
                iconElement.style.color = iconColor;
                iconElement.textContent = icon;

                const absSumDataText = document.createTextNode(absSumData);

                insertElement_minus.innerHTML = '';
                insertElement_minus.appendChild(absSumDataText);

                if (icon !== '') {
                    insertElement_minus.appendChild(iconElement);
                }
            }


            if (insertTips) {
                let checkTip = '';

                if (checkTipsDataHome > 0) {
                    checkTip = `${home.textContent}  ${oddHome}`;
                } else if (checkTipsDataAway > 0) {
                    checkTip = `${away.textContent}  ${oddAway}`;
                }

                insertTips.innerHTML = checkTip;
                setTipHandicap(checkTip);
            }

            if (insertTipsOU) {
                const checkTip = checkTipsDataOU > 0 ? `Over ${oddOU}` : checkTipsDataOU < 0 ? `Under ${oddOU}` : '';

                insertTipsOU.innerHTML = checkTip;
                setTipOU(checkTip)
            }


        };

        // const insertData = (tr, data) => {
        //     const { elementId, sumData } = data;
        //     const insertElement = tr.querySelector(elementId);

        //     if (insertElement) {
        //         const icon = sumData < 0 ? `${<ArrowDropUpIcon />}` : `${<ArrowDropDownIcon />}`;
        //         const absSumData = Math.abs(sumData).toFixed(2);

        //         insertElement.innerHTML = absSumData + icon;
        //     }
        // };

        const Odd = async () => {
            const tr = document.getElementById("tr_" + e.MATCH_ID);
            let checkTip = '';
            if (tr !== null) {
                const dataToInsert = [
                    {
                        elementIdGoal: `#goal_${e.MATCH_ID}`,
                        liveElementIdGoalLive: `#goalLive_${e.MATCH_ID}`
                    },
                    {
                        elementId_positive: `#insertGoal_${e.MATCH_ID}`,
                        sumData_positive: await sreachOdd(`#goalEarly_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_${e.MATCH_ID}`, tr),

                    },
                    {
                        elementId_positive: `#insertGoalLive_${e.MATCH_ID}`,
                        sumData_positive: await sreachOdd(`#goalEarlyLive_${e.MATCH_ID}`, tr) - await sreachOdd(`#goalLive_${e.MATCH_ID}`, tr),

                    },
                    {
                        elementId_minus: `#insertUpOdd_${e.MATCH_ID}`,
                        sumData_minus: await sreachOdd(`#upoddsEarly_${e.MATCH_ID}`, tr) - await sreachOdd(`#upodds_${e.MATCH_ID}`, tr),
                    },
                    {
                        elementId_minus: `#insertDownOdd_${e.MATCH_ID}`,
                        sumData_minus: await sreachOdd(`#downoddsEarly_${e.MATCH_ID}`, tr) - await sreachOdd(`#downodds_${e.MATCH_ID}`, tr),
                    },
                    /* Over/Under */
                    {
                        elementId_positive: `#insertGoal_t1_${e.MATCH_ID}`,
                        sumData_positive: await sreachOdd(`#goalEarly_t1_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),
                        // checkTipsData: await sreachOdd(`#goalEarly_t1_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),
                    },
                    {
                        elementId_minus: `#insertUpodds_t_${e.MATCH_ID}`,
                        sumData_minus: await sreachOdd(`#upoddsEarly_t_${e.MATCH_ID}`, tr) - await sreachOdd(`#upodds_t_${e.MATCH_ID}`, tr),
                    },
                    {
                        elementId_minus: `#insertDownodds_t_${e.MATCH_ID}`,
                        sumData_minus: await sreachOdd(`#downoddsEarly_t_${e.MATCH_ID}`, tr) - await sreachOdd(`#downodds_t_${e.MATCH_ID}`, tr),
                    },
                    {
                        tip: `#tip_${e.MATCH_ID}`,
                        homeID: `#home_${e.MATCH_ID}`,
                        awayID: `#away_${e.MATCH_ID}`,
                        oddHome: await sreachOdd(`#goal_${e.MATCH_ID}`, tr),
                        oddAway: await sreachOdd(`#goalLive_${e.MATCH_ID}`, tr),
                        checkTipsDataHome: await sreachOdd(`#goalEarly_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_${e.MATCH_ID}`, tr),
                        checkTipsDataAway: await sreachOdd(`#goalEarlyLive_${e.MATCH_ID}`, tr) - await sreachOdd(`#goalLive_${e.MATCH_ID}`, tr),
                    },
                    {
                        tipOU: `#tipOU_${e.MATCH_ID}`,
                        oddOU: await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),
                        checkTipsDataOU: await sreachOdd(`#goalEarly_t1_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),
                    }
                ];

                for (const data of dataToInsert) {
                    await insertData(tr, data);
                }
            }
        }

        Odd();
        const intervalIdOdds = setInterval(Odd, 30000);

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
    const { ODDS_AH_FT, ODDS_OU_FT } = parsedOdds;

    return (
        <tr
            matchid={e.MATCH_ID}
            id={`tr_${e.MATCH_ID}`}
            odds={JSON.stringify(e)}
            chOdds={ODDS_AH_FT.f.g}
            data-s={scheduleRT?.STATUS ? scheduleRT?.STATUS : e?.STATUS}
            data-t={JSON.stringify(scheduleRT) ? JSON.stringify(scheduleRT) : ""}
            team={(ODDS_AH_FT.l.g < 0 ? -ODDS_AH_FT.l.g ? `meAway_${e.MATCH_ID}` : "" : -ODDS_AH_FT.l.g ? `meHome_${e.MATCH_ID}` : "")}
        >
            <td className="td-time" style={{ width: '5%' }} dangerouslySetInnerHTML={{ __html: UTCtoLocalTime(e.TIME_STAMP, isLocalTimeZone) }}></td>
            <td className="td-league">{e.LEAGUE_NAME}</td>
            <td className="td-match">
                <div>
                    <p id={`home_${e.MATCH_ID}`} className={(ODDS_AH_FT.l.g < 0 ? -ODDS_AH_FT.l.g : -ODDS_AH_FT.l.g ? `me_color` : "")} >{e.HOME_NAME}</p>
                    <p id={`away_${e.MATCH_ID}`} className={(ODDS_AH_FT.l.g < 0 ? ODDS_AH_FT.l.g ? `me_color` : "" : ODDS_AH_FT.l.g)} >{e.AWAY_NAME}</p>
                </div>
            </td>
            <td className="td-handicap-live">
                <div className="tr__row">
                    <div className="tr__col handicap.instantHandicap" id={`goal_${e.MATCH_ID}`}>
                        <span>
                            {(ODDS_AH_FT.l.g < 0 ? -ODDS_AH_FT.l.g : -ODDS_AH_FT.l.g)}
                        </span>
                    </div>

                    <div className="tr__col handicap.instantHandicap" id={`goalLive_${e.MATCH_ID}`}>
                        <span>
                            {(ODDS_AH_FT.l.g < 0 ? ODDS_AH_FT.l.g : ODDS_AH_FT.l.g)}
                        </span>
                    </div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col handicap.instantHome" id={`upodds_${e.MATCH_ID}`}>{ODDS_AH_FT.l.u}</div>
                    <div className="tr__col handicap.instantAway" id={`downodds_${e.MATCH_ID}`}>{ODDS_AH_FT.l.d}</div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col handicap.initialHandicap" id={`goalEarly_${e.MATCH_ID}`}><span>{ODDS_AH_FT.f.g < 0 ? -ODDS_AH_FT.f.g : -ODDS_AH_FT.f.g}</span></div>
                    <div className="tr__col handicap.initialHandicap" id={`goalEarlyLive_${e.MATCH_ID}`}><span>{ODDS_AH_FT.f.g < 0 ? ODDS_AH_FT.f.g : ODDS_AH_FT.f.g}</span></div>
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
                    <div className="tr__col handicap.fluctuatingHandicap" id={`tip_${e.MATCH_ID}`}></div>
                </div>
            </td>
            <td>
                <div className="tr__row_remove">
                    <div className="tr__col overUnder.instantHandicap" id={`goal_t1_${e.MATCH_ID}`}>{ODDS_OU_FT.l.g}</div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col overUnder.instantOver" id={`upodds_t_${e.MATCH_ID}`}>{ODDS_OU_FT.l.d}</div>
                    <div className="tr__col overUnder.instantUnder" id={`downodds_t_${e.MATCH_ID}`}>{ODDS_OU_FT.l.u}</div>
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
            <td className="td-overunder-tip">
                <div className="tr__col handicap.fluctuatingHandicap" id={`tipOU_${e.MATCH_ID}`}></div>
            </td>
            <td className="td-viewfull"><button onClick={handleViewClickButton}>View</button></td>
        </tr>
    );
};

export default DataTable;
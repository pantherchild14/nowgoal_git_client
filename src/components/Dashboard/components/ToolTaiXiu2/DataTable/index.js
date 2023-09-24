import React, { useEffect, useState } from "react";

import { UTCtoLocalTime, formatNumber } from "../../../../../helpers";
import { INIT_STATE } from "../../../../../constant";


const DataTable = (props) => {
    const { e, odds, statusRedux, selectedTips, selectedTeamUp, selectedOver, selectedOddOver, selectedOddOverRun } = props;
    const [tipOU, setTipOU] = useState("");

    const scheduleRT = statusRedux?.$;
    const isLocalTimeZone = localStorage.getItem('TIME_ZONE')

    const handleViewClickButton = () => {
        let params = '';

        // if (tipHandicap !== '') {
        //     params += `ah=${tipHandicap}`;
        // }

        // if (tipOU !== '') {
        //     if (params !== '') {
        //         params += '&';
        //     }
        //     params += `ou=${tipOU}`;
        // }

        const newUrl = `/match/${e.MATCH_ID}${params !== '' ? `?${params}` : ''}`;
        window.open(newUrl, '_blank');
    };

    const handleLinkNowgGoal = () => {
        const newUrl = `${INIT_STATE.nowgoal.url}${e.MATCH_ID}`;
        window.open(newUrl, '_blank');
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

        const findAttribute = (elementId, attributeName, tr) => {
            const element = tr.querySelector(elementId);
            if (element) {
                const attributeValue = element.getAttribute(attributeName);
                if (attributeValue !== null) {
                    return parseFloat(attributeValue);
                }
            }
            return 0;
        };


        const insertData = (tr, data) => {
            const { elementId_positive, sumData_positive, elementId_minus, sumData_minus, tipOU, checkTipsDataHome, checkTipsDataAway, checkTipsDataOU, oddOU } = data;
            const insertElement_positive = tr.querySelector(elementId_positive);
            const insertElement_minus = tr.querySelector(elementId_minus);
            const insertTipsOU = tr.querySelector(tipOU);

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
                } else {
                    absSumData = "-"
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
                } else {
                    absSumData = "-"
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



            if (insertTipsOU) {
                let checkTip = '';
                if (checkTipsDataHome === 0.25 && checkTipsDataOU >= 2.75) {
                    checkTip = `Over ${oddOU}`;
                } else if (checkTipsDataAway === 0.25 && checkTipsDataOU >= 2.75) {
                    checkTip = `Over ${oddOU}`;
                }

                insertTipsOU.innerHTML = checkTip;
                setTipOU(checkTip)
            }


        };

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
                        // sumData_positive: await sreachOdd(`#goalEarly_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_${e.MATCH_ID}`, tr),
                        sumData_positive: await findAttribute(`#goalEarly_${e.MATCH_ID}`, "odd_goal", tr) - await findAttribute(`#goal_${e.MATCH_ID}`, "odd_goal", tr),

                    },
                    {
                        elementId_positive: `#insertGoalLive_${e.MATCH_ID}`,
                        // sumData_positive: await sreachOdd(`#goalEarlyLive_${e.MATCH_ID}`, tr) - await sreachOdd(`#goalLive_${e.MATCH_ID}`, tr),
                        sumData_positive: await findAttribute(`#goalEarlyLive_${e.MATCH_ID}`, "odd_goallive", tr) - await findAttribute(`#goalLive_${e.MATCH_ID}`, "odd_goallive", tr),
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
                        // elementId_positive: `#insertGoal_t1_${e.MATCH_ID}`,
                        // sumData_positive: await sreachOdd(`#goalEarly_t1_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),
                        // checkTipsData: await sreachOdd(`#goalEarly_t1_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),

                        elementId_minus: `#insertGoal_t1_${e.MATCH_ID}`,
                        sumData_minus: await sreachOdd(`#goalEarly_t1_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),
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
                        tipOU: `#tipOU_${e.MATCH_ID}`,
                        oddOU: await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),
                        checkTipsDataOU: await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),
                        checkTipsDataHome: await sreachOdd(`#goal_${e.MATCH_ID}`, tr),
                        checkTipsDataAway: await sreachOdd(`#goalLive_${e.MATCH_ID}`, tr),
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

    useEffect(() => {
        const getOdds = (trElement, nameAttri) => {
            var text = trElement.attributes[`${nameAttri}`].value;
            return text
        }
        var tr = document.getElementById("tr_" + e.MATCH_ID);

        var oddHome = tr.querySelector("#upodds_" + e.MATCH_ID);
        var oddAway = tr.querySelector("#downodds_" + e.MATCH_ID);
        var home = tr.querySelector("#goal_" + e.MATCH_ID);
        var away = tr.querySelector("#goalLive_" + e.MATCH_ID);
        var checkHome = getOdds(home, "odd_goal");
        var checkAway = getOdds(away, "odd_goallive");

        var oddOverHome = tr.querySelector("#upodds_t_" + e.MATCH_ID);
        var oddOverAway = tr.querySelector("#downodds_t_" + e.MATCH_ID);

        var tipValue = tr.attributes["tip"].value;
        var teamValue = tr.attributes["team"].value;
        var overValue = tr.attributes["tp"].value;


        if (selectedTips === true) {
            if (tipValue === "tip") {
                tr.style.display = 'revert';
                if (selectedTeamUp === 'away') {
                    if (teamValue === `meAway_${e.MATCH_ID}`) {
                        tr.style.display = 'revert';

                        if (selectedOver === true && checkAway < 0 && overValue !== "Over 2.75") {
                            tr.style.display = 'none';
                        } else {

                            if (selectedOddOverRun && checkAway < 0) {
                                if (oddAway.textContent >= selectedOddOverRun) {
                                    tr.style.display = 'revert';
                                    if (selectedOddOver) {
                                        if (oddOverAway.textContent >= selectedOddOver) {
                                            tr.style.display = 'revert';
                                        } else {
                                            tr.style.display = 'none';
                                        }
                                    }
                                } else {
                                    tr.style.display = 'none';
                                }
                            }

                            if (selectedOddOver && checkAway < 0) {
                                if (oddOverAway.textContent >= selectedOddOver) {
                                    tr.style.display = 'revert';
                                    if (selectedOddOverRun) {
                                        if (oddAway.textContent >= selectedOddOverRun) {
                                            tr.style.display = 'revert';
                                        } else {
                                            tr.style.display = 'none';
                                        }
                                    }
                                } else {
                                    tr.style.display = 'none';
                                }
                            }


                        }

                    } else {
                        tr.style.display = 'none';
                    }
                } else if (selectedTeamUp === 'home') {
                    if (teamValue === `meHome_${e.MATCH_ID}`) {
                        tr.style.display = 'revert';
                        if (selectedOver === true && checkHome < 0 && overValue !== "Over 2.75") {
                            tr.style.display = 'none';
                        } else {
                            if (selectedOddOver && checkHome < 0) {
                                if (oddOverHome.textContent >= selectedOddOver) {
                                    tr.style.display = 'revert';

                                    if (selectedOddOverRun && checkHome < 0) {
                                        if (oddHome.textContent >= selectedOddOverRun) {
                                            tr.style.display = 'revert';
                                        } else {
                                            tr.style.display = 'none';
                                        }

                                    }

                                } else {
                                    tr.style.display = 'none';
                                }
                            }

                            if (selectedOddOverRun && checkHome < 0) {
                                if (oddHome.textContent >= selectedOddOverRun) {
                                    tr.style.display = 'revert';

                                    if (selectedOddOver && checkHome < 0) {
                                        if (oddOverHome.textContent >= selectedOddOver) {
                                            tr.style.display = 'revert';
                                        } else {
                                            tr.style.display = 'none';
                                        }

                                    }

                                } else {
                                    tr.style.display = 'none';
                                }
                            }
                        }


                    } else {
                        tr.style.display = 'none';
                    }
                } else {
                    tr.style.display = 'revert';
                }

                if (selectedTeamUp !== 'home' && selectedTeamUp !== 'away') {
                    if (selectedOver === true) {
                        if (overValue === "Over 2.75") {
                            tr.style.display = 'revert';

                            if (selectedOddOverRun) {
                                if (oddHome.textContent >= selectedOddOverRun && oddAway.textContent >= selectedOddOverRun) {
                                    tr.style.display = 'revert';

                                    if (selectedOddOver) {
                                        if (oddOverHome.textContent >= selectedOddOver && oddOverAway.textContent >= selectedOddOver) {
                                            tr.style.display = 'revert';
                                        } else {
                                            tr.style.display = 'none';
                                        }
                                    }

                                } else {
                                    tr.style.display = 'none';
                                }
                            }

                            if (selectedOddOver) {
                                if (oddOverHome.textContent >= selectedOddOver && oddOverAway.textContent >= selectedOddOver) {
                                    tr.style.display = 'revert';

                                    if (selectedOddOverRun) {
                                        if (oddHome.textContent >= selectedOddOverRun && oddAway.textContent >= selectedOddOverRun) {
                                            tr.style.display = 'revert';
                                        } else {
                                            tr.style.display = 'none';
                                        }
                                    }

                                } else {
                                    tr.style.display = 'none';
                                }

                            }


                        } else {
                            tr.style.display = 'none';
                        }
                    }

                    if (selectedOddOverRun && checkHome < 0) {
                        if (oddHome.textContent >= selectedOddOverRun) {
                            tr.style.display = 'revert';

                            if (selectedOddOver && checkHome < 0) {
                                if (oddOverHome.textContent >= selectedOddOver) {
                                    tr.style.display = 'revert';
                                } else {
                                    tr.style.display = 'none';
                                }

                            }

                        } else {
                            tr.style.display = 'none';
                        }
                    }

                    if (selectedOddOver && checkHome < 0) {
                        if (oddOverHome.textContent >= selectedOddOver) {
                            tr.style.display = 'revert';

                            if (selectedOddOverRun && checkHome < 0) {
                                if (oddHome.textContent >= selectedOddOverRun) {
                                    tr.style.display = 'revert';
                                } else {
                                    tr.style.display = 'none';
                                }
                            }
                        } else {
                            tr.style.display = 'none';
                        }

                    }

                    /************************* */

                    if (selectedOddOverRun && checkAway < 0) {
                        if (oddAway.textContent >= selectedOddOverRun) {
                            tr.style.display = 'revert';

                            if (selectedOddOver && checkAway < 0) {
                                if (oddOverAway.textContent >= selectedOddOver) {
                                    tr.style.display = 'revert';
                                } else {
                                    tr.style.display = 'none';
                                }
                            }

                        } else {
                            tr.style.display = 'none';
                        }
                    }

                    if (selectedOddOver && checkAway < 0) {
                        if (oddOverAway.textContent >= selectedOddOver) {
                            tr.style.display = 'revert';

                            if (selectedOddOverRun && checkAway < 0) {
                                if (oddAway.textContent >= selectedOddOverRun) {
                                    tr.style.display = 'revert';
                                } else {
                                    tr.style.display = 'none';
                                }
                            }

                        } else {
                            tr.style.display = 'none';
                        }
                    }
                }
            } else {
                tr.style.display = 'none';
            }
        } else if (selectedTips === false) {
            tr.style.display = 'revert';
        }
    }, [selectedTips, selectedTeamUp, selectedOver, selectedOddOverRun, selectedOddOver]);

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
            odds_rt=""
            team={((ODDS_AH_FT.l.g) < 0 ? (-ODDS_AH_FT.l.g) ? `meAway_${e.MATCH_ID}` : "" : (-ODDS_AH_FT.l.g) ? `meHome_${e.MATCH_ID}` : "")}
            tip={tipOU ? "tip" : ""}
            tp={tipOU}
        >
            <td className="td-time" style={{ width: '5%' }} >
                {/* {UTCtoLocalTime(e.TIME_STAMP, isLocalTimeZone)} */}
                <span id={'t_' + e.MATCH_ID} name="timeData" style={{ fontSize: '13px' }} >
                    {/* {UTCtoLocalTime(e.MATCH_TIME, isLocalTimeZone)} */}
                    <div dangerouslySetInnerHTML={{ __html: UTCtoLocalTime(e.TIME_STAMP, isLocalTimeZone) }} />
                </span>

                <br />
                <span id={'tos_' + e.MATCH_ID} style={{ fontSize: '13px' }} className="red" sx={{ display: 'grid' }}>
                    {scheduleRT?.STATUS === "2nd Half" || scheduleRT?.STATUS === "1st Half" ? (
                        <div className="live-score">Live </div>
                    ) : (
                        ""
                    )}
                </span>
            </td>
            <td className="td-league">{e.LEAGUE_SHORT_NAME}</td>
            <td className="td-match">
                <div>
                    <p id={`home_${e.MATCH_ID}`} className={((ODDS_AH_FT.l.g) < 0 ? (-ODDS_AH_FT.l.g) : (-ODDS_AH_FT.l.g) ? `me_color` : "")} >{e.HOME_NAME}</p>
                    <p id={`away_${e.MATCH_ID}`} className={((ODDS_AH_FT.l.g) < 0 ? (ODDS_AH_FT.l.g) ? `me_color` : "" : (ODDS_AH_FT.l.g))} >{e.AWAY_NAME}</p>
                </div>
            </td>
            <td width="5%" style={{ textAlign: 'center' }} className="td-score">
                <span id={'hs' + e.MATCH_ID} className="blue">{scheduleRT?.HOME_SCORE}</span>
                <br />
                <span id={'ms' + e.MATCH_ID}>{scheduleRT?.START_TIME}</span>
                <br />
                <span id={'gs' + e.MATCH_ID} className="blue">{scheduleRT?.AWAY_SCORE}</span>
            </td>
            {/* ***************************************************  Handicap  ***************************************************** */}

            <td className="td-handicap-live">
                <div className="tr__row">
                    {/* <div className="tr__col handicap.instantHandicap" id={`goal_${e.MATCH_ID}`}>
                        <span>
                            {(ODDS_AH_FT.l.g < 0 ? -ODDS_AH_FT.l.g : -ODDS_AH_FT.l.g)}
                        </span>
                    </div>

                    <div className="tr__col handicap.instantHandicap" id={`goalLive_${e.MATCH_ID}`}>
                        <span>
                            {(ODDS_AH_FT.l.g < 0 ? ODDS_AH_FT.l.g : ODDS_AH_FT.l.g)}
                        </span>
                    </div> */}
                    {/* Home  */}
                    {ODDS_AH_FT.l.g < 0 ? (
                        " ") : (
                        <React.Fragment>
                            <div className="tr__col handicap.instantHandicap" odd_goal={((ODDS_AH_FT.l.g) < 0 ? (-ODDS_AH_FT.l.g) : (-ODDS_AH_FT.l.g))} odd id={`goal_${e.MATCH_ID}`}>
                                <span>
                                    {(ODDS_AH_FT.l.g) < 0 ? (-ODDS_AH_FT.l.g) : (ODDS_AH_FT.l.g)}
                                </span>
                            </div>
                            <div className="tr__col handicap.instantHandicap" odd_goalLive={((ODDS_AH_FT.l.g) < 0 ? (ODDS_AH_FT.l.g) : (ODDS_AH_FT.l.g))} id={`goalLive_${e.MATCH_ID}`}>
                                <span></span>
                            </div>
                        </React.Fragment>
                    )}

                    {ODDS_AH_FT.l.g < 0 ? (
                        <React.Fragment>
                            <div className="tr__col handicap.instantHandicap" odd_goal={((ODDS_AH_FT.l.g) < 0 ? (-ODDS_AH_FT.l.g) : (-ODDS_AH_FT.l.g))} id={`goal_${e.MATCH_ID}`}>
                                <span></span>
                            </div>
                            <div className="tr__col handicap.instantHandicap" odd_goalLive={((ODDS_AH_FT.l.g) < 0 ? (ODDS_AH_FT.l.g) : (ODDS_AH_FT.l.g))} id={`goalLive_${e.MATCH_ID}`}>
                                <span>
                                    {(ODDS_AH_FT.l.g) < 0 ? (-ODDS_AH_FT.l.g) : (ODDS_AH_FT.l.g)}
                                </span>
                            </div>
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                </div>
            </td>
            <td>
                <div className="tr__row" >
                    <div className="tr__col handicap.instantHome" id={`upodds_${e.MATCH_ID}`}>
                        {ODDS_AH_FT.l.u}
                    </div>
                    <div className="tr__col handicap.instantAway" id={`downodds_${e.MATCH_ID}`}>
                        {ODDS_AH_FT.l.d}
                    </div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    {/* <div className="tr__col handicap.initialHandicap" id={`goalEarly_${e.MATCH_ID}`}><span>{ODDS_AH_FT.f.g < 0 ? -ODDS_AH_FT.f.g : -ODDS_AH_FT.f.g}</span></div>
                    <div className="tr__col handicap.initialHandicap" id={`goalEarlyLive_${e.MATCH_ID}`}><span>{ODDS_AH_FT.f.g < 0 ? ODDS_AH_FT.f.g : ODDS_AH_FT.f.g}</span></div> */}

                    {ODDS_AH_FT.f.g < 0 ? (
                        " ") : (
                        <React.Fragment>
                            <div className="tr__col handicap.instantHandicap" odd_goal={(ODDS_AH_FT.f.g) < 0 ? (-ODDS_AH_FT.f.g) : (-ODDS_AH_FT.f.g)} id={`goalEarly_${e.MATCH_ID}`}>
                                <span>
                                    {(ODDS_AH_FT.f.g) < 0 ? (-ODDS_AH_FT.f.g) : (ODDS_AH_FT.f.g)}
                                </span>
                            </div>
                            <div className="tr__col handicap.instantHandicap" odd_goalLive={(ODDS_AH_FT.f.g) < 0 ? (ODDS_AH_FT.f.g) : (ODDS_AH_FT.f.g)} id={`goalEarlyLive_${e.MATCH_ID}`}>
                                <span></span>
                            </div>
                        </React.Fragment>
                    )}
                    {ODDS_AH_FT.f.g < 0 ? (
                        <React.Fragment>
                            <div className="tr__col handicap.instantHandicap" odd_goal={(ODDS_AH_FT.f.g) < 0 ? (-ODDS_AH_FT.f.g) : (-ODDS_AH_FT.f.g)} id={`goalEarly_${e.MATCH_ID}`}>
                                <span></span>
                            </div>
                            <div className="tr__col handicap.instantHandicap" odd_goalLive={(ODDS_AH_FT.f.g) < 0 ? (ODDS_AH_FT.f.g) : (ODDS_AH_FT.f.g)} id={`goalEarlyLive_${e.MATCH_ID}`}>
                                <span>
                                    {(ODDS_AH_FT.f.g) < 0 ? (-ODDS_AH_FT.f.g) : (ODDS_AH_FT.f.g)}
                                </span>
                            </div>
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                </div>
            </td>
            <td>
                <div className="tr__row" >
                    <div className="tr__col handicap.initialHome" id={`upoddsEarly_${e.MATCH_ID}`}>{formatNumber(ODDS_AH_FT.f.u)}</div>
                    <div className="tr__col handicap.initialAway" id={`downoddsEarly_${e.MATCH_ID}`}>{formatNumber(ODDS_AH_FT.f.d)}</div>
                </div>
            </td>


            <td className="td-handicap-bd-live">
                <div className="tr__row_remove" >
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

            {/* ***************************************************  Over/Under  ***************************************************** */}

            <td>
                <div className="tr__row_remove">
                    <div className="tr__col overUnder.instantHandicap" id={`goal_t1_${e.MATCH_ID}`}>{(ODDS_OU_FT.l.g)}</div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col overUnder.instantOver" id={`upodds_t_${e.MATCH_ID}`}>{formatNumber(ODDS_OU_FT.l.u)}</div>
                    <div className="tr__col overUnder.instantUnder" id={`downodds_t_${e.MATCH_ID}`}>{formatNumber(ODDS_OU_FT.l.d)}</div>
                </div>
            </td>
            <td>
                <div className="tr__row_remove" >
                    <div className="tr__col overUnder.initialHandicap" id={`goalEarly_t1_${e.MATCH_ID}`}>{(ODDS_OU_FT.f.g)}</div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col overUnder.initialOver" id={`upoddsEarly_t_${e.MATCH_ID}`}>{formatNumber(ODDS_OU_FT.f.u)}</div>
                    <div className="tr__col overUnder.initialUnder" id={`downoddsEarly_t_${e.MATCH_ID}`}>{formatNumber(ODDS_OU_FT.f.d)}</div>
                </div>
            </td>

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

            {/* ***************************************************  Tips  ***************************************************** */}

            <td className="td-overunder-tip">
                <div className="tr__col handicap.fluctuatingHandicap" id={`tipOU_${e.MATCH_ID}`}></div>
            </td>

            {/* ***************************************************  Handicap Run   ***************************************************** */}

            <td className="td-handicap-run">
                {/* <div className="tr__row_remove">
                    <div className="tr__col handicap.instantHandicap" id={`goalRun_${e.MATCH_ID}`}>{ODDS_AH_FT.r.g}</div>
                </div> */}
                <div className="tr__row">
                    {(ODDS_AH_FT.l.g) < 0 ? (
                        " ") : (
                        <React.Fragment>
                            <div className="tr__col handicap.instantHandicap" odd_over={(ODDS_AH_FT.r.g)} id={`goalRun_${e.MATCH_ID}`}>{(ODDS_AH_FT.r.g) < 0 ? (-ODDS_AH_FT.r.g) : (ODDS_AH_FT.r.g)}</div>
                            <div className="tr__col handicap.instantHandicap" id={`goalRunDemo_${e.MATCH_ID}`}></div>
                        </React.Fragment>
                    )}

                    {(ODDS_AH_FT.l.g) < 0 ? (
                        <React.Fragment>
                            <div className="tr__col handicap.instantHandicap" id={`goalRunDemo_${e.MATCH_ID}`}></div>
                            <div className="tr__col handicap.instantHandicap" id={`goalRun_${e.MATCH_ID}`}>{(ODDS_AH_FT.r.g) < 0 ? (-ODDS_AH_FT.r.g) : (ODDS_AH_FT.r.g)}</div>
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col handicap.instantHome" id={`upoddsRun_${e.MATCH_ID}`}>{formatNumber(ODDS_AH_FT.r.u)}</div>
                    <div className="tr__col handicap.instantAway" id={`downoddsRun_${e.MATCH_ID}`}>{formatNumber(ODDS_AH_FT.r.d)}</div>
                </div>
            </td>

            {/* ***************************************************  Over/Under Run   ***************************************************** */}

            <td>
                <div className="tr__row_remove">
                    <div className="tr__col overUnder.instantHandicap" id={`goalRun_t1_${e.MATCH_ID}`}>{(ODDS_OU_FT.r.g)}</div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col overUnder.instantOver" id={`upoddsRun_t_${e.MATCH_ID}`}>{formatNumber(ODDS_OU_FT.r.u)}</div>
                    <div className="tr__col overUnder.instantUnder" id={`downoddsRun_t_${e.MATCH_ID}`}>{formatNumber(ODDS_OU_FT.r.d)}</div>
                </div>
            </td>

            {/* ***************************************************  View   ***************************************************** */}
            {/* onClick={handleViewClickButton} */}
            <td >
                <div className="td-viewfull" style={{ display: 'grid', padding: '0px 5px 0 5px' }}>
                    <button style={{ marginBottom: '5px' }}>View</button>
                    <button onClick={handleLinkNowgGoal}>Link</button>
                </div>
            </td>
        </tr>
    );
};

export default DataTable;
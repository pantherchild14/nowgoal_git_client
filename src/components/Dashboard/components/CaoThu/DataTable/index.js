import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import * as actions from "../../../../../redux/actions";
import { oddDetailHistoryState$ } from "../../../../../redux/selectors";
import OddDetailModal from "./OddDetailModal";

const DataTable = (props) => {
    const { e, odds } = props;
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const oddDetailHistory = useSelector(oddDetailHistoryState$);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleViewClick = () => {
        dispatch(actions.getOddsChangeDetailHistory.getOddsChangeDetailHistoryRequest(e.MATCH_ID));
        handleOpen();
    };

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
        <tr matchid={e.MATCH_ID} id={`tr_${e.MATCH_ID}`} odds="" data-s="" data-t="">
            <td className="td-time" dangerouslySetInnerHTML={{ __html: formattedTime }}></td>
            <td className="td-timestart" dangerouslySetInnerHTML={{ __html: formattedTime }}></td>
            <td className="td-league">{e.LEAGUE_NAME}</td>
            <td className="td-match"><div><p className="">{e.HOME_NAME}</p> <p className="">{e.AWAY_NAME}</p></div></td>
            <td className="td-handicap-live">
                <div className="tr__row">
                    <div className="tr__col handicap.instantHandicap"><span>{ODDS_AH_FT.f.g}</span></div>
                    <div className="tr__col handicap.instantHandicap"><span>{ODDS_AH_FT.f.g}</span></div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col handicap.instantHome">{ODDS_AH_FT.f.u}</div>
                    <div className="tr__col handicap.instantAway">{ODDS_AH_FT.f.d}</div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col handicap.initialHandicap"><span>{ODDS_AH_FT.l.g}</span></div>
                    <div className="tr__col handicap.initialHandicap"><span>{ODDS_AH_FT.l.g}</span></div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col handicap.initialHome">{ODDS_AH_FT.l.u}</div>
                    <div className="tr__col handicap.initialAway">{ODDS_AH_FT.l.d}</div>
                </div>
            </td>

            {/* live  */}

            <td className="td-handicap-bd-live">
                <div className="tr__row_remove">
                    <div className="tr__col handicap.initialHandicap-handicap.instantHandicap" id={`goal_${e.MATCH_ID}`}>{ODDS_AH_FT.r.g}{/* <span>0.25<i className="icon-up"></i></span> */}</div>
                </div>
            </td>
            <td className="td-handicap-odds-bd">
                <div className="tr__row">

                    <div className="tr__col handicap.initialHome-handicap.instantHome" id={`upodds_${e.MATCH_ID}`}>{ODDS_AH_FT.r.d}{/* <span>0.33<i className="icon-up"></i></span> */}</div>
                    <div className="tr__col handicap.initialAway-handicap.instantAway" id={`downodds_${e.MATCH_ID}`}>{ODDS_AH_FT.r.u}{/* <span>0.36<i className="icon-down"></i></span> */}</div>
                </div>
            </td>

            {/* live  */}

            <td className="td-handicap-tips">
                <div className="tr__row_remove">
                    <div className="tr__col handicap.fluctuatingHandicap"><span>Montenegro (W) U19 +0</span></div>
                </div>
            </td>
            <td>
                <div className="tr__row_remove">
                    <div className="tr__col overUnder.instantHandicap">{ODDS_OU_FT.f.g}</div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col overUnder.instantOver">{ODDS_OU_FT.f.u}</div>
                    <div className="tr__col overUnder.instantUnder">{ODDS_OU_FT.f.d}</div>
                </div>
            </td>
            <td>
                <div className="tr__row_remove">
                    <div className="tr__col overUnder.initialHandicap">{ODDS_OU_FT.l.g}</div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col overUnder.initialOver">{ODDS_OU_FT.l.u}</div>
                    <div className="tr__col overUnder.initialUnder">{ODDS_OU_FT.l.d}</div>
                </div>
            </td>

            {/* live  */}

            <td>
                <div className="tr__row_remove">
                    <div className="tr__col overUnder.initialHandicap - overUnder.instantHandicap" id={`goal_t1_${e.MATCH_ID}`}>{ODDS_OU_FT.r.g}{/* <span>0</span> */}</div>
                </div>
            </td>
            <td>
                <div className="tr__row">

                    <div className="tr__col overUnder.initialOver - overUnder.instantOver" id={`upodds_t_${e.MATCH_ID}`}>{ODDS_OU_FT.r.d}{/* <span>0.05<i className="icon-up"></i></span> */}</div>

                    <div className="tr__col overUnder.initialUnder - overUnder.instantUnder" id={`downodds_t_${e.MATCH_ID}`}>{ODDS_OU_FT.r.u}{/* <span>0.05<i className="icon-down"></i></span> */}</div>
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